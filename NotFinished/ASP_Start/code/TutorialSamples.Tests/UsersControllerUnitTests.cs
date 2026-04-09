using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using TutorialSamples.Controllers;
using TutorialSamples.Data;
using TutorialSamples.DTOs;
using TutorialSamples.Models;

namespace TutorialSamples.Tests;

/// <summary>
/// 控制器单元测试（使用 Mock）
/// </summary>
public class UsersControllerUnitTests
{
    private readonly Mock<BlogContext> _mockContext;
    private readonly UsersController _controller;

    public UsersControllerUnitTests()
    {
        // 创建模拟的 DbContext
        _mockContext = new Mock<BlogContext>(new DbContextOptions<BlogContext>());

        // 由于 EF Core 的 DbSet 不能直接 mock，这里使用 InMemory 数据库
        var options = new DbContextOptionsBuilder<BlogContext>()
            .UseInMemoryDatabase("UnitTestDb_" + Guid.NewGuid())
            .Options;

        var context = new BlogContext(options);
        _controller = new UsersController(context);
    }

    [Fact]
    public async Task GetUser_ExistingUser_ReturnsUser()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<BlogContext>()
            .UseInMemoryDatabase("GetUserTest_" + Guid.NewGuid())
            .Options;

        using var context = new BlogContext(options);
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = "existinguser",
            Email = "existing@example.com",
            CreatedAt = DateTime.UtcNow
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        var controller = new UsersController(context);

        // Act
        var result = await controller.GetUser(user.Id);

        // Assert
        var actionResult = Assert.IsType<ActionResult<User>>(result);
        var returnedUser = Assert.IsType<User>(actionResult.Value);
        Assert.Equal("existinguser", returnedUser.Username);
    }

    [Fact]
    public async Task GetUser_NonExistingUser_ReturnsNotFound()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<BlogContext>()
            .UseInMemoryDatabase("GetUserNotFoundTest_" + Guid.NewGuid())
            .Options;

        using var context = new BlogContext(options);
        var controller = new UsersController(context);

        // Act
        var result = await controller.GetUser(Guid.NewGuid());

        // Assert
        var actionResult = Assert.IsType<ActionResult<User>>(result);
        Assert.IsType<NotFoundObjectResult>(actionResult.Result);
    }

    [Fact]
    public async Task CreateUser_ValidUser_ReturnsCreatedAtAction()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<BlogContext>()
            .UseInMemoryDatabase("CreateUserTest_" + Guid.NewGuid())
            .Options;

        using var context = new BlogContext(options);
        var controller = new UsersController(context);

        var dto = new UserCreateDto
        {
            Username = "newuser",
            Email = "new@example.com",
            Age = 25
        };

        // Act
        var result = await controller.CreateUser(dto);

        // Assert
        var actionResult = Assert.IsType<ActionResult<User>>(result);
        var createdResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
        var returnedUser = Assert.IsType<User>(createdResult.Value);
        Assert.Equal("newuser", returnedUser.Username);
        Assert.Equal("new@example.com", returnedUser.Email);
        Assert.Equal(25, returnedUser.Age);
    }

    [Fact]
    public async Task CreateUser_DuplicateUsername_ReturnsConflict()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<BlogContext>()
            .UseInMemoryDatabase("DuplicateUserTest_" + Guid.NewGuid())
            .Options;

        using var context = new BlogContext(options);

        // 添加已存在的用户
        context.Users.Add(new User
        {
            Id = Guid.NewGuid(),
            Username = "duplicate",
            Email = "existing@example.com",
            CreatedAt = DateTime.UtcNow
        });
        await context.SaveChangesAsync();

        var controller = new UsersController(context);

        var dto = new UserCreateDto
        {
            Username = "duplicate",
            Email = "another@example.com"
        };

        // Act
        var result = await controller.CreateUser(dto);

        // Assert
        var actionResult = Assert.IsType<ActionResult<User>>(result);
        Assert.IsType<ConflictObjectResult>(actionResult.Result);
    }

    [Fact]
    public async Task DeleteUser_ExistingUser_ReturnsNoContent()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<BlogContext>()
            .UseInMemoryDatabase("DeleteUserTest_" + Guid.NewGuid())
            .Options;

        using var context = new BlogContext(options);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = "toDelete",
            Email = "delete@example.com",
            CreatedAt = DateTime.UtcNow
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        var controller = new UsersController(context);

        // Act
        var result = await controller.DeleteUser(user.Id);

        // Assert
        Assert.IsType<NoContentResult>(result);

        // 验证已删除
        var deletedUser = await context.Users.FindAsync(user.Id);
        Assert.Null(deletedUser);
    }
}