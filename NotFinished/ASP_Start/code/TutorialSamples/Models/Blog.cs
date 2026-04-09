using System.ComponentModel.DataAnnotations;

namespace TutorialSamples.Models;

/// <summary>
/// 博客实体模型（第9章 EF Core 实体模型示例）
/// </summary>
public class Blog
{
    /// <summary>
    /// 博客ID，主键
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// 标题，必填，最大长度100
    /// </summary>
    [Required(ErrorMessage = "标题不能为空")]
    [MaxLength(100, ErrorMessage = "标题最大100个字符")]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// 内容，必填，最大长度2000
    /// </summary>
    [Required(ErrorMessage = "内容不能为空")]
    [MaxLength(2000, ErrorMessage = "内容最大2000个字符")]
    public string Content { get; set; } = string.Empty;

    /// <summary>
    /// 描述，可选
    /// </summary>
    [MaxLength(200)]
    public string? Description { get; set; }

    /// <summary>
    /// 标签列表（EF Core 8+ 支持）
    /// </summary>
    public List<string> Tags { get; set; } = new();

    /// <summary>
    /// 创建时间
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// 更新时间
    /// </summary>
    public DateTime? UpdatedAt { get; set; }

    /// <summary>
    /// 所属用户ID（外键）
    /// </summary>
    [Required]
    public Guid UserId { get; set; }

    /// <summary>
    /// 所属用户（导航属性）
    /// </summary>
    public User User { get; set; } = null!;
}