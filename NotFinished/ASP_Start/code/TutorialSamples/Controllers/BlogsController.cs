using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TutorialSamples.Data;
using TutorialSamples.DTOs;
using TutorialSamples.Models;

namespace TutorialSamples.Controllers;

/// <summary>
/// 博客控制器（第10章 EF Core 增删查改完整示例）
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class BlogsController : ControllerBase
{
    private readonly BlogContext _context;

    public BlogsController(BlogContext context)
    {
        _context = context;
    }

    /// <summary>
    /// 获取博客列表（支持筛选和分页）
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<object>> GetBlogs([FromQuery] BlogQueryDto query)
    {
        // 构建查询
        var queryable = _context.Blogs.AsQueryable();

        // 条件筛选
        if (query.UserId.HasValue)
        {
            queryable = queryable.Where(b => b.UserId == query.UserId.Value);
        }

        if (!string.IsNullOrEmpty(query.Title))
        {
            queryable = queryable.Where(b => b.Title.Contains(query.Title));
        }

        if (!string.IsNullOrEmpty(query.Tag))
        {
            queryable = queryable.Where(b => b.Tags.Contains(query.Tag));
        }

        // 总数
        var totalCount = await queryable.CountAsync();

        // 分页
        var items = await queryable
            .OrderByDescending(b => b.CreatedAt)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync();

        return Ok(new
        {
            items,
            totalCount,
            page = query.Page,
            pageSize = query.PageSize,
            totalPages = (int)Math.Ceiling(totalCount / (double)query.PageSize)
        });
    }

    /// <summary>
    /// 根据ID获取博客
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Blog>> GetBlog(Guid id)
    {
        var blog = await _context.Blogs
            .Include(b => b.User)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (blog == null)
        {
            return NotFound(new { message = "博客不存在" });
        }

        return blog;
    }

    /// <summary>
    /// 创建博客
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Blog>> CreateBlog([FromBody] BlogCreateDto dto)
    {
        // 验证用户是否存在
        var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);
        if (!userExists)
        {
            return Problem("用户不存在", statusCode: 400);
        }

        var blog = new Blog
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Content = dto.Content,
            Description = dto.Description,
            Tags = dto.Tags ?? new List<string>(),
            UserId = dto.UserId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Blogs.Add(blog);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBlog), new { id = blog.Id }, blog);
    }

    /// <summary>
    /// 更新博客（部分更新）
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBlog(Guid id, [FromBody] BlogUpdateDto dto)
    {
        var blog = await _context.Blogs.FindAsync(id);
        if (blog == null)
        {
            return NotFound();
        }

        // 部分更新：只更新提供的字段
        if (dto.Title != null)
            blog.Title = dto.Title;

        if (dto.Content != null)
            blog.Content = dto.Content;

        if (dto.Description != null)
            blog.Description = dto.Description;

        if (dto.Tags != null)
            blog.Tags = dto.Tags;

        blog.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(blog);
    }

    /// <summary>
    /// 删除博客
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBlog(Guid id)
    {
        var blog = await _context.Blogs.FindAsync(id);
        if (blog == null)
        {
            return NotFound();
        }

        _context.Blogs.Remove(blog);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// 直接执行删除（EF 7+，不先查询）
    /// </summary>
    [HttpDelete("{id}/direct")]
    public async Task<IActionResult> DeleteBlogDirect(Guid id)
    {
        var affected = await _context.Blogs
            .Where(b => b.Id == id)
            .ExecuteDeleteAsync();

        if (affected == 0)
        {
            return NotFound();
        }

        return NoContent();
    }
}