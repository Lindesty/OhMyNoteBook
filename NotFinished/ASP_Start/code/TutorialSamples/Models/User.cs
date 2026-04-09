using System.ComponentModel.DataAnnotations;

namespace TutorialSamples.Models;

/// <summary>
/// 用户实体模型（第9章 EF Core 实体模型示例）
/// </summary>
public class User
{
    /// <summary>
    /// 用户ID，主键
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// 用户名，必填，最大长度40
    /// </summary>
    [Required(ErrorMessage = "用户名不能为空")]
    [StringLength(40, MinimumLength = 2, ErrorMessage = "用户名长度必须在2-40之间")]
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// 邮箱
    /// </summary>
    [EmailAddress(ErrorMessage = "邮箱格式不正确")]
    public string? Email { get; set; }

    /// <summary>
    /// 年龄
    /// </summary>
    [Range(0, 150, ErrorMessage = "年龄必须在0-150之间")]
    public int? Age { get; set; }

    /// <summary>
    /// 创建时间
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// 用户拥有的博客列表（一对多关系）
    /// </summary>
    public List<Blog> Blogs { get; set; } = new();
}