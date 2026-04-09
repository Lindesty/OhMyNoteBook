using System.ComponentModel.DataAnnotations;

namespace TutorialSamples.DTOs;

/// <summary>
/// 用户创建 DTO
/// </summary>
public class UserCreateDto
{
    [Required(ErrorMessage = "用户名不能为空")]
    [StringLength(40, MinimumLength = 2, ErrorMessage = "用户名长度2-40")]
    public string Username { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "邮箱格式不正确")]
    public string? Email { get; set; }

    [Range(0, 150, ErrorMessage = "年龄必须在0-150之间")]
    public int? Age { get; set; }
}

/// <summary>
/// 用户登录 DTO（第6章请求处理示例）
/// </summary>
public class UserLoginDto
{
    [Required(ErrorMessage = "用户名不能为空")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "密码不能为空")]
    public string Password { get; set; } = string.Empty;
}

/// <summary>
/// 修改密码 DTO
/// </summary>
public class ChangePasswordDto
{
    [Required]
    public string OldPassword { get; set; } = string.Empty;

    [Required]
    [MinLength(6, ErrorMessage = "密码最少6位")]
    public string NewPassword { get; set; } = string.Empty;
}