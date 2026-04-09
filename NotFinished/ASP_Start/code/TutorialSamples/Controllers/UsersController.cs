using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TutorialSamples.Data;
using TutorialSamples.DTOs;
using TutorialSamples.Models;

namespace TutorialSamples.Controllers;

/// <summary>
/// 用户控制器（第5章 Controller 示例、第6章请求处理示例）
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly BlogContext _context;

    public UsersController(BlogContext context)
    {
        _context = context;
    }

    /// <summary>
    /// 获取用户列表（第10章 查询示例）
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<User>>> GetUsers([FromQuery] string? name)
    {
        var query = _context.Users.AsQueryable();

        if (!string.IsNullOrEmpty(name))
        {
            query = query.Where(u => u.Username.Contains(name));
        }

        return await query.ToListAsync();
    }

    /// <summary>
    /// 根据ID获取用户
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "用户不存在" });
        }
        return user;
    }

    /// <summary>
    /// 创建用户（第10章 添加数据示例）
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<User>> CreateUser([FromBody] UserCreateDto dto)
    {
        // 检查用户名是否已存在
        if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
        {
            return Conflict(new { message = "用户名已存在" });
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = dto.Username,
            Email = dto.Email,
            Age = dto.Age,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    /// <summary>
    /// 删除用户（第10章 删除数据示例）
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    #region 请求处理示例（第6章）

    /// <summary>
    /// 登录示例 - 从方法参数获取（第6章）
    /// </summary>
    [HttpGet("login")]
    public IActionResult LoginFromParams(string username, string password)
    {
        // 演示：直接从方法参数获取
        Console.WriteLine($"用户名: {username}, 密码: {password}");
        return Ok(new { success = true, message = "登录成功（参数方式）" });
    }

    /// <summary>
    /// 登录示例 - 从 HttpContext 获取（第6章）
    /// </summary>
    [HttpPost("login-context")]
    public IActionResult LoginFromContext()
    {
        // 演示：从 HttpContext 获取请求参数
        var username = Request.Query["username"].ToString();
        var password = Request.Query["password"].ToString();

        // 从请求头获取
        if (Request.Headers.TryGetValue("X-Username", out var headerUsername))
        {
            username = headerUsername.ToString();
        }

        // 从请求体获取
        using var reader = new StreamReader(Request.Body);
        var body = reader.ReadToEndAsync().Result;

        Console.WriteLine($"用户名: {username}, 密码: {password}, Body: {body}");
        return Ok(new { success = true, message = "登录成功（HttpContext方式）" });
    }

    /// <summary>
    /// 登录示例 - 模型绑定（第6章）
    /// </summary>
    [HttpPost("login-model")]
    public IActionResult LoginFromModel([FromBody] UserLoginDto dto)
    {
        // 演示：使用模型绑定自动映射
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        return Ok(new { success = true, username = dto.Username });
    }

    /// <summary>
    /// 从请求头获取分页参数（第6章 FromHeader 示例）
    /// </summary>
    [HttpGet("paged")]
    public IActionResult GetPagedUsers(
        [FromHeader(Name = "X-Page-Index")] int pageIndex = 1,
        [FromHeader(Name = "X-Page-Size")] int pageSize = 10)
    {
        return Ok(new { pageIndex, pageSize });
    }

    #endregion
}