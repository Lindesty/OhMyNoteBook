using System.Net;
using System.Net.Http.Json;
using TutorialSamples.DTOs;
using TutorialSamples.Models;

namespace TutorialSamples.Tests;

/// <summary>
/// 博客 API 集成测试
/// </summary>
public class BlogsApiTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly HttpClient _client;

    public BlogsApiTests(TestWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetBlogs_ReturnsPaginatedResult()
    {
        var response = await _client.GetAsync("/api/blogs");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("items", content);
        Assert.Contains("totalCount", content);
    }

    [Fact]
    public async Task CreateBlog_WithInvalidUserId_ReturnsBadRequest()
    {
        var dto = new BlogCreateDto
        {
            Title = "Test Blog",
            Content = "Content",
            UserId = Guid.NewGuid()
        };

        var response = await _client.PostAsJsonAsync("/api/blogs", dto);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact(Skip = "ExecuteDeleteAsync not supported by InMemory database provider")]
    public async Task DeleteBlogDirect_Ef7ExecuteDelete_ReturnsNoContent()
    {
        // This test is skipped because InMemory database doesn't support ExecuteDeleteAsync
    }
}