using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TutorialSamples.Data;
using TutorialSamples.DTOs;
using TutorialSamples.Models;

namespace TutorialSamples.Controllers;

/// <summary>
/// 投票主题控制器（第12章 项目实战示例）
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TopicsController : ControllerBase
{
    private readonly BlogContext _context;
    private readonly ILogger<TopicsController> _logger;

    public TopicsController(BlogContext context, ILogger<TopicsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// 获取所有投票主题
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<Topic>>> GetTopics()
    {
        var topics = await _context.Topics
            .Include(t => t.Options)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        return topics;
    }

    /// <summary>
    /// 获取投票主题详情（包含选项和投票数）
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<VoteResultDto>> GetTopic(Guid id)
    {
        var topic = await _context.Topics
            .Include(t => t.Options)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (topic == null)
        {
            return NotFound(new { message = "投票主题不存在" });
        }

        // 统计每个选项的票数
        var optionIds = topic.Options.Select(o => o.Id).ToList();
        var voteCounts = await _context.Votes
            .Where(v => optionIds.Contains(v.OptionId))
            .GroupBy(v => v.OptionId)
            .Select(g => new { OptionId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.OptionId, x => x.Count);

        var totalVotes = voteCounts.Values.Sum();

        var result = new VoteResultDto
        {
            TopicId = topic.Id,
            Title = topic.Title,
            TotalVotes = totalVotes,
            Options = topic.Options.Select(o => new OptionResultDto
            {
                OptionId = o.Id,
                Content = o.Content,
                VoteCount = voteCounts.GetValueOrDefault(o.Id, 0),
                Percentage = totalVotes > 0
                    ? Math.Round((double)voteCounts.GetValueOrDefault(o.Id, 0) / totalVotes * 100, 2)
                    : 0
            }).ToList()
        };

        return result;
    }

    /// <summary>
    /// 创建投票主题
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Topic>> CreateTopic([FromBody] TopicCreateDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var topic = new Topic
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Description = dto.Description,
            CreatedAt = DateTime.UtcNow
        };

        // 创建选项
        foreach (var optionContent in dto.Options)
        {
            topic.Options.Add(new Option
            {
                Id = Guid.NewGuid(),
                Content = optionContent,
                TopicId = topic.Id
            });
        }

        _context.Topics.Add(topic);
        await _context.SaveChangesAsync();

        _logger.LogInformation("创建投票主题: {Title}, 选项数: {Count}", topic.Title, topic.Options.Count);

        return CreatedAtAction(nameof(GetTopic), new { id = topic.Id }, topic);
    }

    /// <summary>
    /// 投票
    /// </summary>
    [HttpPost("vote")]
    public async Task<IActionResult> Vote([FromBody] VoteDto dto)
    {
        // 验证选项是否属于该主题
        var option = await _context.Options
            .Include(o => o.Topic)
            .FirstOrDefaultAsync(o => o.Id == dto.OptionId);

        if (option == null)
        {
            return NotFound(new { message = "选项不存在" });
        }

        if (option.TopicId != dto.TopicId)
        {
            return BadRequest(new { message = "选项不属于该投票主题" });
        }

        // 检查是否已投票（如果提供了投票者ID）
        if (!string.IsNullOrEmpty(dto.VoterId))
        {
            var existingVote = await _context.Votes
                .AnyAsync(v => v.TopicId == dto.TopicId && v.VoterId == dto.VoterId);

            if (existingVote)
            {
                return Conflict(new { message = "您已经投过票了" });
            }
        }

        var vote = new Vote
        {
            Id = Guid.NewGuid(),
            TopicId = dto.TopicId,
            OptionId = dto.OptionId,
            VoterId = dto.VoterId ?? Guid.NewGuid().ToString(),
            CreatedAt = DateTime.UtcNow
        };

        _context.Votes.Add(vote);
        await _context.SaveChangesAsync();

        _logger.LogInformation("投票成功: 主题 {TopicId}, 选项 {OptionId}", dto.TopicId, dto.OptionId);

        return Ok(new { message = "投票成功", voteId = vote.Id });
    }

    /// <summary>
    /// 获取投票统计结果
    /// </summary>
    [HttpGet("{id}/result")]
    public async Task<ActionResult<VoteResultDto>> GetVoteResult(Guid id)
    {
        var topic = await _context.Topics.FindAsync(id);
        if (topic == null)
        {
            return NotFound(new { message = "投票主题不存在" });
        }

        var options = await _context.Options
            .Where(o => o.TopicId == id)
            .ToListAsync();

        var optionIds = options.Select(o => o.Id).ToList();
        var voteCounts = await _context.Votes
            .Where(v => optionIds.Contains(v.OptionId))
            .GroupBy(v => v.OptionId)
            .Select(g => new { OptionId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.OptionId, x => x.Count);

        var totalVotes = voteCounts.Values.Sum();

        var result = new VoteResultDto
        {
            TopicId = topic.Id,
            Title = topic.Title,
            TotalVotes = totalVotes,
            Options = options.Select(o => new OptionResultDto
            {
                OptionId = o.Id,
                Content = o.Content,
                VoteCount = voteCounts.GetValueOrDefault(o.Id, 0),
                Percentage = totalVotes > 0
                    ? Math.Round((double)voteCounts.GetValueOrDefault(o.Id, 0) / totalVotes * 100, 2)
                    : 0
            }).OrderByDescending(o => o.VoteCount).ToList()
        };

        return result;
    }

    /// <summary>
    /// 删除投票主题（级联删除选项和投票）
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTopic(Guid id)
    {
        var topic = await _context.Topics.FindAsync(id);
        if (topic == null)
        {
            return NotFound();
        }

        _context.Topics.Remove(topic);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// 批量添加选项
    /// </summary>
    [HttpPost("{id}/options")]
    public async Task<IActionResult> AddOptions(Guid id, [FromBody] List<string> optionContents)
    {
        var topic = await _context.Topics.FindAsync(id);
        if (topic == null)
        {
            return NotFound(new { message = "投票主题不存在" });
        }

        var options = optionContents.Select(content => new Option
        {
            Id = Guid.NewGuid(),
            Content = content,
            TopicId = id
        }).ToList();

        _context.Options.AddRange(options);
        await _context.SaveChangesAsync();

        return Ok(new { addedCount = options.Count });
    }
}