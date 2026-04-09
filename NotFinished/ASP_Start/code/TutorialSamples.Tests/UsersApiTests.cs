using System.Net;
using System.Net.Http.Json;
using TutorialSamples.DTOs;
using TutorialSamples.Models;

namespace TutorialSamples.Tests;

/// <summary>
/// 用户 API 集成测试
/// </summary>
public class UsersApiTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly HttpClient _client;

    public UsersApiTests(TestWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetUsers_ReturnsSuccessStatusCode()
    {
        var response = await _client.GetAsync("/api/users");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task CreateUser_ReturnsCreatedStatusCode()
    {
        var dto = new UserCreateDto
        {
            Username = "u_" + Guid.NewGuid().ToString("N"),
            Email = "test@example.com",
            Age = 30
        };

        var response = await _client.PostAsJsonAsync("/api/users", dto);
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }

    [Fact]
    public async Task CreateUser_WithInvalidEmail_ReturnsBadRequest()
    {
        var dto = new UserCreateDto
        {
            Username = "u_" + Guid.NewGuid().ToString("N"),
            Email = "invalid-email",
            Age = 30
        };

        var response = await _client.PostAsJsonAsync("/api/users", dto);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetUser_WithInvalidId_ReturnsNotFound()
    {
        var response = await _client.GetAsync($"/api/users/{Guid.NewGuid()}");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}