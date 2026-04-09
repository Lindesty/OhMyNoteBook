using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TutorialSamples.Data;

namespace TutorialSamples.Tests;

/// <summary>
/// 测试 WebApplicationFactory（集成测试基类）
/// </summary>
public class TestWebApplicationFactory : WebApplicationFactory<Program>
{
    // 每个测试类实例获取独立的数据库
    private static int _dbCounter = 0;

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        var dbIndex = Interlocked.Increment(ref _dbCounter);

        builder.ConfigureServices(services =>
        {
            // 替换数据库为独立的内存数据库
            var descriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbContextOptions<BlogContext>));

            if (descriptor != null)
            {
                services.Remove(descriptor);
            }

            services.AddDbContext<BlogContext>(options =>
            {
                options.UseInMemoryDatabase($"TestDb_{dbIndex}_{Guid.NewGuid()}");
            });
        });
    }
}