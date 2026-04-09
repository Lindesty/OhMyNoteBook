using Microsoft.EntityFrameworkCore;
using TutorialSamples.Models;

namespace TutorialSamples.Data;

/// <summary>
/// 数据库上下文（第9章 EF Core 核心概念示例）
/// </summary>
public class BlogContext : DbContext
{
    public BlogContext(DbContextOptions<BlogContext> options)
        : base(options)
    {
    }

    // DbSet 对应数据库中的表
    public DbSet<User> Users => Set<User>();
    public DbSet<Blog> Blogs => Set<Blog>();
    public DbSet<Topic> Topics => Set<Topic>();
    public DbSet<Option> Options => Set<Option>();
    public DbSet<Vote> Votes => Set<Vote>();

    /// <summary>
    /// 配置模型
    /// </summary>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // 配置 Blog 实体
        modelBuilder.Entity<Blog>(entity =>
        {
            // 索引
            entity.HasIndex(b => b.Title);
            entity.HasIndex(b => b.Tags);

            // 关系
            entity.HasOne(b => b.User)
                  .WithMany(u => u.Blogs)
                  .HasForeignKey(b => b.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // 配置 User 实体
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.Username).IsUnique();
            entity.HasIndex(u => u.Email);
        });

        // 配置投票主题
        modelBuilder.Entity<Topic>(entity =>
        {
            entity.HasMany(t => t.Options)
                  .WithOne(o => o.Topic)
                  .HasForeignKey(o => o.TopicId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // 配置投票选项
        modelBuilder.Entity<Option>(entity =>
        {
            entity.HasMany(o => o.Votes)
                  .WithOne(v => v.Option)
                  .HasForeignKey(v => v.OptionId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // 种子数据
        SeedData(modelBuilder);
    }

    /// <summary>
    /// 添加种子数据
    /// </summary>
    private static void SeedData(ModelBuilder modelBuilder)
    {
        var userId = Guid.Parse("00000000-0000-0000-0000-000000000001");

        modelBuilder.Entity<User>().HasData(new User
        {
            Id = userId,
            Username = "demo",
            Email = "demo@example.com",
            Age = 25,
            CreatedAt = DateTime.UtcNow
        });

        modelBuilder.Entity<Blog>().HasData(
            new Blog
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000002"),
                Title = "第一篇博客",
                Content = "这是第一篇博客的内容...",
                Description = "博客描述",
                Tags = new List<string> { "技术", "教程" },
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            },
            new Blog
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000003"),
                Title = "ASP.NET Core 入门",
                Content = "ASP.NET Core 是一个跨平台的高性能框架...",
                Description = "ASP.NET Core 教程",
                Tags = new List<string> { "ASP.NET", "C#", "Web" },
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            }
        );
    }
}