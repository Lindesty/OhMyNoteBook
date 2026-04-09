using System.ComponentModel.DataAnnotations;

namespace TutorialSamples.Models;

/// <summary>
/// 投票主题（第12章 项目实战）
/// </summary>
public class Topic
{
    public Guid Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsActive { get; set; } = true;

    /// <summary>
    /// 主题包含的选项
    /// </summary>
    public List<Option> Options { get; set; } = new();
}

/// <summary>
/// 投票选项
/// </summary>
public class Option
{
    public Guid Id { get; set; }

    [Required]
    [MaxLength(500)]
    public string Content { get; set; } = string.Empty;

    public Guid TopicId { get; set; }
    public Topic Topic { get; set; } = null!;

    /// <summary>
    /// 该选项收到的投票
    /// </summary>
    public List<Vote> Votes { get; set; } = new();
}

/// <summary>
/// 投票记录
/// </summary>
public class Vote
{
    public Guid Id { get; set; }

    public Guid TopicId { get; set; }
    public Topic Topic { get; set; } = null!;

    public Guid OptionId { get; set; }
    public Option Option { get; set; } = null!;

    /// <summary>
    /// 投票者标识（可以是用户ID或IP地址等）
    /// </summary>
    [MaxLength(100)]
    public string? VoterId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}