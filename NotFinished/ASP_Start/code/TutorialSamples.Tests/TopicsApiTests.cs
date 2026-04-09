using System.Net;
using System.Net.Http.Json;
using TutorialSamples.DTOs;
using TutorialSamples.Models;

namespace TutorialSamples.Tests;

/// <summary>
/// 投票 API 集成测试
/// </summary>
public class TopicsApiTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly HttpClient _client;

    public TopicsApiTests(TestWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetTopics_ReturnsSuccessStatusCode()
    {
        var response = await _client.GetAsync("/api/topics");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task CreateTopic_ReturnsCreated()
    {
        var dto = new TopicCreateDto
        {
            Title = "Poll " + Guid.NewGuid().ToString("N"),
            Description = "A test voting topic",
            Options = new List<string> { "Option A", "Option B" }
        };

        var response = await _client.PostAsJsonAsync("/api/topics", dto);
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }

    [Fact]
    public async Task CreateTopic_WithSingleOption_ReturnsBadRequest()
    {
        var dto = new TopicCreateDto
        {
            Title = "Invalid Poll",
            Options = new List<string> { "Only One Option" }
        };

        var response = await _client.PostAsJsonAsync("/api/topics", dto);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}