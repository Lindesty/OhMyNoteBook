using System.ComponentModel.DataAnnotations;

namespace TutorialSamples.DTOs;

/// <summary>
/// 创建投票主题 DTO
/// </summary>
public class TopicCreateDto
{
    [Required(ErrorMessage = "标题不能为空")]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required(ErrorMessage = "至少需要一个选项")]
    [MinLength(2, ErrorMessage = "至少需要2个选项")]
    public List<string> Options { get; set; } = new();
}

/// <summary>
/// 投票 DTO
/// </summary>
public class VoteDto
{
    [Required]
    public Guid TopicId { get; set; }

    [Required]
    public Guid OptionId { get; set; }

    public string? VoterId { get; set; }
}

/// <summary>
/// 投票结果 DTO
/// </summary>
public class VoteResultDto
{
    public Guid TopicId { get; set; }
    public string Title { get; set; } = string.Empty;
    public int TotalVotes { get; set; }
    public List<OptionResultDto> Options { get; set; } = new();
}

/// <summary>
/// 选项结果 DTO
/// </summary>
public class OptionResultDto
{
    public Guid OptionId { get; set; }
    public string Content { get; set; } = string.Empty;
    public int VoteCount { get; set; }
    public double Percentage { get; set; }
}