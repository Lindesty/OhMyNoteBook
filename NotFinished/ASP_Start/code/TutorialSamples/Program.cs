// ============================================================
// 第4章：创建第一个 Web API 应用 - 最简程序示例
// ============================================================

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 添加服务到容器
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // 处理循环引用
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 配置数据库上下文（使用内存数据库进行演示）
builder.Services.AddDbContext<TutorialSamples.Data.BlogContext>(options =>
    options.UseInMemoryDatabase("TutorialDb"));

// 配置文件上传大小限制
builder.Services.Configure<Microsoft.AspNetCore.Http.Features.FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 10 * 1024 * 1024; // 10MB
});

var app = builder.Build();

// 配置 HTTP 请求管道
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// ============================================================
// Mini API 示例（第4章）
// ============================================================

// 最简单的 Hello World
app.MapGet("/hello", () => "Hello, ASP.NET Core!");

// 带参数的路由
app.MapGet("/hello/{name}", (string name) => $"Hello, {name}!");

// POST 请求示例
app.MapPost("/mini-api/users", (string username) =>
{
    return Results.Created($"/mini-api/users/{Guid.NewGuid()}", new { Username = username });
});

// 健康检查端点（用于部署验证）
app.MapGet("/health", () => Results.Ok("Healthy"));

app.Run();

// 使 Program 类对测试项目可见
public partial class Program { }