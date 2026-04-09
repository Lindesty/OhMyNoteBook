using System.ComponentModel.DataAnnotations;

namespace TutorialSamples.DTOs;

/// <summary>
/// 创建博客 DTO（第6章 模型绑定与验证示例）
/// </summary>
public class BlogCreateDto
{
    /// <summary>
    /// 标题
    /// </summary>
    [Required(ErrorMessage = "标题不能为空")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "标题长度2-100")]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// 内容
    /// </summary>
    [Required(ErrorMessage = "内容不能为空")]
    [MaxLength(2000, ErrorMessage = "内容最大2000字符")]
    public string Content { get; set; } = string.Empty;

    /// <summary>
    /// 描述
    /// </summary>
    [MaxLength(200)]
    public string? Description { get; set; }

    /// <summary>
    /// 标签
    /// </summary>
    public List<string>? Tags { get; set; }

    /// <summary>
    /// 所属用户ID
    /// </summary>
    [Required(ErrorMessage = "用户ID不能为空")]
    public Guid UserId { get; set; }
}

/// <summary>
/// 更新博客 DTO
/// </summary>
public class BlogUpdateDto
{
    /// <summary>
    /// 标题（可选，支持部分更新）
    /// </summary>
    [StringLength(100, MinimumLength = 2)]
    public string? Title { get; set; }

    /// <summary>
    /// 内容（可选）
    /// </summary>
    [MaxLength(2000)]
    public string? Content { get; set; }

    /// <summary>
    /// 描述（可选）
    /// </summary>
    [MaxLength(200)]
    public string? Description { get; set; }

    /// <summary>
    /// 标签（可选）
    /// </summary>
    public List<string>? Tags { get; set; }
}

/// <summary>
/// 博客查询参数
/// </summary>
public class BlogQueryDto
{
    /// <summary>
    /// 用户ID
    /// </summary>
    public Guid? UserId { get; set; }

    /// <summary>
    /// 标题关键词
    /// </summary>
    public string? Title { get; set; }

    /// <summary>
    /// 标签
    /// </summary>
    public string? Tag { get; set; }

    /// <summary>
    /// 页码
    /// </summary>
    [Range(1, int.MaxValue)]
    public int Page { get; set; } = 1;

    /// <summary>
    /// 每页数量
    /// </summary>
    [Range(1, 100)]
    public int PageSize { get; set; } = 10;
}