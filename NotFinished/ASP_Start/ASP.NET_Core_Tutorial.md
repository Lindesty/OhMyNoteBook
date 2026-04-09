# ASP.NET Core Web 开发教程

> 作者：世纪文明
> 本教程基于视频字幕整理，旨在帮助初学者快速入门并建立完整的知识体系

---

## 目录

1. [教程概述](#1-教程概述)
2. [Web 基础知识](#2-web-基础知识)
3. [开发环境准备](#3-开发环境准备)
4. [创建第一个 Web API 应用](#4-创建第一个-web-api-应用)
5. [使用 Controller 管理 API](#5-使用-controller-管理-api)
6. [请求处理](#6-请求处理)
7. [业务逻辑处理](#7-业务逻辑处理)
8. [响应返回](#8-响应返回)
9. [Entity Framework Core](#9-entity-framework-core)
10. [EF Core 增删查改操作](#10-ef-core-增删查改操作)
11. [常见功能实现](#11-常见功能实现)
12. [项目实战](#12-项目实战)
13. [发布和部署](#13-发布和部署)

---

## 1. 教程概述

### 1.1 教程目标

本教程的主要目标：

1. **对 Web 开发建立认知** - 建立起基础的知识体系，理解 Web 开发的本质
2. **能够使用 ASP.NET Core 开发简单项目** - 如博客系统、个人简历、投票应用等

### 1.2 面向群体

- 有任意编程语言基础的开发者
- 零 Web 开发基础的开发者
- 想要从事 Web 后端开发的人群
- 初级 Web 后端开发人员

### 1.3 学习方法

**转变学习思维**：

1. **拒绝死记硬背** - 技术是靠练习积累出来的，通过理解来记忆
2. **理解技术的本质** - 了解技术来源何处、作用是什么、解决什么问题
3. **动手实践** - 通过具体项目验证学习内容

### 1.4 主要内容

| 模块 | 内容 |
|------|------|
| Web 开发基础概念 | 浏览器、服务器、HTTP 协议等 |
| ASP.NET Core 教程 | Web 框架的使用 |
| Entity Framework Core | ORM 框架的使用 |
| 常见功能实现 | 文件上传、验证授权等 |
| 项目实战 | 投票系统完整实现 |
| 部署 | IIS、Nginx、Docker 部署 |

---

## 2. Web 基础知识

### 2.1 从熟悉的事物了解 Web 开发

#### 核心概念

1. **设备与浏览器**
   - 浏览器是运行在操作系统上的应用程序
   - 各设备都有浏览器，是使用时间最长的应用程序

2. **服务器**
   - 本质上是一台计算机，提供网络服务
   - 可存储数据并提供资源访问

3. **角色**
   - **用户**：服务的使用者
   - **开发人员**：服务的创建者

#### 交互流程

```
用户 → 浏览器 → 请求 → 服务器 → 响应 → 浏览器 → 用户
```

### 2.2 浏览器技术栈

浏览器主要解决四个问题：

| 问题 | 技术 | 作用 |
|------|------|------|
| 展示什么 | HTML | 定义页面元素 |
| 展示效果 | CSS | 定义样式 |
| 用户交互 | JavaScript | 处理交互逻辑 |
| 数据来源 | HTTP | 与服务器通信 |

### 2.3 后端服务开发

#### 核心流程

```
接收请求 → 解析请求 → 业务逻辑处理 → 返回响应
```

#### Web 框架的价值

框架帮助我们处理：
- 请求解析与协议实现
- 路由匹配
- 身份验证与授权
- 数据验证
- 响应格式化

### 2.4 HTTP 协议

#### 协议发展历史

| 版本 | 年份 | 特点 |
|------|------|------|
| HTTP/0.9 | 1991 | 只支持 GET 请求，纯文本 |
| HTTP/1.0 | 1996 | 增加请求头/响应头，支持多种格式 |
| HTTP/1.1 | 1997 | 持久连接、管道化等特性 |
| HTTP/2.0 | 2015 | 多路复用、头部压缩 |
| HTTP/3.0 | - | 基于 UDP，更快 |

#### 核心概念

1. **URL（统一资源定位符）**
   - 用于唯一定位网络资源

2. **请求组成**
   - 请求行（方法、URL、协议版本）
   - 请求头（Headers）
   - 请求体（Body）

3. **响应组成**
   - 状态行（状态码）
   - 响应头（Headers）
   - 响应体（Body）

4. **常用请求方法**
   - GET：获取资源
   - POST：创建资源
   - PUT：更新资源
   - DELETE：删除资源

#### RESTful API

基于 HTTP 协议的最佳实践：
- 使用 JSON 格式传输数据
- 使用 HTTP 方法表示操作类型
- 使用 HTTP 状态码表示结果

---

## 3. 开发环境准备

### 3.1 核心概念

| 概念 | 说明 |
|------|------|
| SDK | 软件开发套件，包含开发所需的工具和运行时 |
| Runtime | 运行时，程序运行所需的环境 |
| IDE | 集成开发环境，如 Visual Studio |

### 3.2 安装步骤

1. **安装 .NET SDK**
   - 访问：https://dotnet.microsoft.com/download
   - 下载并安装最新版 SDK

2. **安装 Visual Studio**
   - 访问：https://visualstudio.microsoft.com
   - 选择 Community 2022 版本（免费）
   - 安装时选择 "ASP.NET 和 Web 开发" 工作负载

3. **可选安装**
   - Git 版本控制
   - GitHub 账号

### 3.3 验证安装

```bash
dotnet --version
dotnet --info
```

---

## 4. 创建第一个 Web API 应用

### 4.1 使用 Visual Studio 创建项目

1. 打开 Visual Studio
2. 选择 "创建新项目"
3. 搜索并选择 "ASP.NET Core Web API"
4. 配置项目名称和位置
5. 选择 .NET 版本（建议最新）
6. 点击创建

### 4.2 项目结构

```
项目/
├── Program.cs          # 入口文件
├── appsettings.json    # 配置文件
├── .csproj             # 项目文件
└── Controllers/        # 控制器目录
```

### 4.3 最简程序

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### 4.4 程序运行流程

1. **CreateBuilder** - 创建构建器
2. **Build** - 构建应用
3. **MapGet/MapPost** - 配置路由
4. **Run** - 启动服务，监听端口

### 4.5 项目创建和运行的四个步骤

```
创建项目 → 还原依赖 → 构建编译 → 运行程序
```

---

## 5. 使用 Controller 管理 API

### 5.1 为什么使用 Controller

当接口数量增加时，需要：
- 更好的代码组织
- 便于团队协作
- 关注点分离

### 5.2 MVC 模式

```
M (Model)    - 数据模型
V (View)     - 视图层
C (Controller) - 控制器，处理请求逻辑
```

### 5.3 创建 Controller

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    [HttpGet]
    public IActionResult Login(string username, string password)
    {
        // 业务逻辑
        return Ok(new { success = true });
    }

    [HttpPost("password")]
    public IActionResult ChangePassword(string newPassword)
    {
        // 业务逻辑
        return Ok(true);
    }
}
```

### 5.4 路由配置

**方式一：约定路由**

```csharp
// Program.cs
builder.Services.AddControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

**方式二：特性路由**

```csharp
[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    [HttpGet]           // GET api/blog
    public IActionResult List() { ... }

    [HttpGet("{id}")]   // GET api/blog/1
    public IActionResult Get(int id) { ... }

    [HttpPost]          // POST api/blog
    public IActionResult Create([FromBody] Blog model) { ... }

    [HttpPut("{id}")]   // PUT api/blog/1
    public IActionResult Update(int id, [FromBody] Blog model) { ... }

    [HttpDelete("{id}")] // DELETE api/blog/1
    public IActionResult Delete(int id) { ... }
}
```

### 5.5 Mini API vs Controller

| 特性 | Mini API | Controller |
|------|----------|------------|
| 代码量 | 少 | 较多 |
| 适用场景 | 小型服务、微服务 | 中大型项目 |
| 结构化 | 较弱 | 强 |

---

## 6. 请求处理

### 6.1 HttpContext 上下文

HttpContext 封装了 HTTP 请求的所有信息：

```csharp
public class HttpContext
{
    public HttpRequest Request { get; }    // 请求信息
    public HttpResponse Response { get; }  // 响应信息
    public IServiceProvider RequestServices { get; }
    // ...
}
```

### 6.2 中间件管道

```
Request → Middleware1 → Middleware2 → Controller → Response
                ↓            ↓
             处理逻辑     处理逻辑
```

### 6.3 获取请求参数的三种方式

#### 方式一：方法参数

```csharp
[HttpGet]
public IActionResult Search(string keyword, int page = 1)
{
    return Ok(new { keyword, page });
}
```

#### 方式二：从 HttpContext 获取

```csharp
[HttpGet]
public IActionResult GetData()
{
    var query = Request.Query["keyword"];
    var header = Request.Headers["X-Custom-Header"];

    using var reader = new StreamReader(Request.Body);
    var body = await reader.ReadToEndAsync();

    return Ok();
}
```

#### 方式三：模型绑定

```csharp
public class BlogModel
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Title { get; set; }

    [Required]
    [MaxLength(2000)]
    public string Content { get; set; }

    public List<string> Tags { get; set; }
}

[HttpPost]
public IActionResult Create([FromBody] BlogModel model)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    return Ok(model);
}
```

### 6.4 数据来源特性

| 特性 | 来源 |
|------|------|
| `[FromQuery]` | URL 查询字符串 |
| `[FromRoute]` | 路由参数 |
| `[FromHeader]` | 请求头 |
| `[FromBody]` | 请求体 |
| `[FromForm]` | 表单数据 |

### 6.5 模型验证

```csharp
public class UserViewModel
{
    [Required(ErrorMessage = "用户名不能为空")]
    [StringLength(40, MinimumLength = 2, ErrorMessage = "长度2-40")]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Range(0, 150)]
    public int Age { get; set; }

    [RegularExpression(@"^\d{11}$")]
    public string Phone { get; set; }
}
```

---

## 7. 业务逻辑处理

### 7.1 常见业务逻辑类型

| 类型 | 说明 | 示例 |
|------|------|------|
| 计算 | 数据运算 | 统计分析、价格计算 |
| 消息通知 | 发送通知 | 短信、邮件、推送 |
| 转发 | 代理请求 | API 网关、反向代理 |
| 定时任务 | 后台执行 | 数据同步、清理任务 |
| 数据库操作 | 数据持久化 | 增删查改 |

### 7.2 数据库操作占比

- 简单应用：数据库操作可能占 100%
- 复杂应用：数据库操作通常占 50-80%

---

## 8. 响应返回

### 8.1 HTTP 状态码

| 范围 | 含义 | 常见状态码 |
|------|------|------------|
| 1xx | 信息响应 | 100 Continue |
| 2xx | 成功 | 200 OK, 201 Created |
| 3xx | 重定向 | 301 Moved, 302 Found |
| 4xx | 客户端错误 | 400 Bad Request, 404 Not Found |
| 5xx | 服务器错误 | 500 Internal Server Error |

### 8.2 返回类型

#### 特定类型

```csharp
[HttpGet]
public List<Blog> GetBlogs()
{
    return _context.Blogs.ToList();
}
```

#### IActionResult

```csharp
[HttpGet("{id}")]
public IActionResult GetBlog(int id)
{
    var blog = _context.Blogs.Find(id);
    if (blog == null)
    {
        return NotFound("博客不存在");
    }
    return Ok(blog);
}

[HttpPost]
public IActionResult Create(BlogModel model)
{
    try
    {
        // 业务逻辑
        return CreatedAtAction(nameof(GetBlog), new { id = blog.Id }, blog);
    }
    catch (Exception ex)
    {
        return Problem(ex.Message);
    }
}
```

#### ActionResult\<T\>

```csharp
[HttpGet("{id}")]
public ActionResult<Blog> GetBlog(int id)
{
    var blog = _context.Blogs.Find(id);
    if (blog == null)
    {
        return NotFound();
    }
    return blog;
}
```

### 8.3 常用返回方法

| 方法 | 状态码 | 用途 |
|------|--------|------|
| `Ok()` | 200 | 成功 |
| `Created()` | 201 | 创建成功 |
| `NoContent()` | 204 | 无内容 |
| `BadRequest()` | 400 | 请求错误 |
| `NotFound()` | 404 | 资源不存在 |
| `Conflict()` | 409 | 资源冲突 |
| `Problem()` | 500 | 服务器错误 |

---

## 9. Entity Framework Core

### 9.1 什么是 EF Core

Entity Framework Core 是微软官方的 ORM 框架：
- 轻量级、开源、跨平台
- 支持 Code First 开发模式
- 支持 LINQ 查询
- 支持多种数据库

### 9.2 核心概念

#### 数据库提供程序

EF Core 通过 Provider 模式支持多种数据库：
- SQL Server
- PostgreSQL
- MySQL
- SQLite

#### 数据库上下文（DbContext）

```csharp
public class BlogContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Blog> Blogs { get; set; }

    public BlogContext(DbContextOptions<BlogContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 配置模型关系
        modelBuilder.Entity<Blog>()
            .HasIndex(b => b.Title);
    }
}
```

#### 实体模型

```csharp
public class User
{
    public Guid Id { get; set; }

    [Required]
    [MaxLength(40)]
    public string Username { get; set; }

    public List<Blog> Blogs { get; set; }
}

public class Blog
{
    public Guid Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; }

    [Required]
    [MaxLength(2000)]
    public string Content { get; set; }

    public string Description { get; set; }

    public List<string> Tags { get; set; }

    [Required]
    public Guid UserId { get; set; }
    public User User { get; set; }
}
```

### 9.3 配置服务

```csharp
// Program.cs
builder.Services.AddDbContext<BlogContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```

### 9.4 Code First 迁移

#### 安装工具

```bash
dotnet tool install --global dotnet-ef
```

#### 安装包

```bash
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

#### 迁移命令

```bash
# 添加迁移
dotnet ef migrations add InitialCreate

# 更新数据库
dotnet ef database update

# 撤销迁移
dotnet ef migrations remove
```

---

## 10. EF Core 增删查改操作

### 10.1 基本操作特点

- **操作对象**：而不是操作表和记录
- **使用 LINQ**：而不是 SQL
- **先获取再操作**：修改和删除前先查询
- **SaveChanges**：提交更改到数据库

### 10.2 添加数据

```csharp
// 添加用户
public async Task<IActionResult> AddUser(string username)
{
    // 检查是否存在
    if (await _context.Users.AnyAsync(u => u.Username == username))
    {
        return Conflict("用户名已存在");
    }

    var user = new User
    {
        Id = Guid.NewGuid(),
        Username = username
    };

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
}
```

### 10.3 查询数据

```csharp
// 查询列表
public async Task<ActionResult<List<User>>> GetUsers(string? name)
{
    var query = _context.Users.AsQueryable();

    if (!string.IsNullOrEmpty(name))
    {
        query = query.Where(u => u.Username == name);
    }

    return await query.ToListAsync();
}

// 条件查询
public async Task<ActionResult<List<Blog>>> SearchBlogs(
    Guid userId, string? title, string? tag)
{
    var query = _context.Blogs
        .Where(b => b.UserId == userId)
        .AsQueryable();

    if (!string.IsNullOrEmpty(title))
    {
        query = query.Where(b => b.Title.Contains(title));
    }

    if (!string.IsNullOrEmpty(tag))
    {
        query = query.Where(b => b.Tags.Contains(tag));
    }

    return await query.ToListAsync();
}
```

### 10.4 更新数据

```csharp
public async Task<IActionResult> UpdateBlog(Guid id, BlogUpdateModel model)
{
    var blog = await _context.Blogs.FindAsync(id);
    if (blog == null)
    {
        return NotFound();
    }

    // 部分更新
    if (model.Title != null)
        blog.Title = model.Title;

    if (model.Content != null)
        blog.Content = model.Content;

    if (model.Tags != null)
        blog.Tags = model.Tags;

    await _context.SaveChangesAsync();

    return Ok(blog);
}
```

### 10.5 删除数据

```csharp
// 方式一：先查询再删除
public async Task<IActionResult> DeleteBlog(Guid id)
{
    var blog = await _context.Blogs.FindAsync(id);
    if (blog == null)
    {
        return NotFound();
    }

    _context.Blogs.Remove(blog);
    await _context.SaveChangesAsync();

    return NoContent();
}

// 方式二：直接执行删除（EF 7+）
public async Task<IActionResult> DeleteBlogDirect(Guid id)
{
    var affected = await _context.Blogs
        .Where(b => b.Id == id)
        .ExecuteDeleteAsync();

    return affected > 0 ? NoContent() : NotFound();
}
```

### 10.6 LINQ 常用方法

| 方法 | 说明 |
|------|------|
| `Where()` | 条件筛选 |
| `Select()` | 投影 |
| `OrderBy()` | 排序 |
| `FirstOrDefault()` | 获取第一条 |
| `Any()` | 是否存在 |
| `Count()` | 计数 |
| `Skip().Take()` | 分页 |
| `Include()` | 加载关联数据 |
| `Contains()` | 包含（模糊查询） |

---

## 11. 常见功能实现

### 11.1 文件上传

```csharp
[HttpPost("upload")]
public async Task<IActionResult> Upload(IFormFile file)
{
    if (file == null || file.Length == 0)
    {
        return BadRequest("请选择文件");
    }

    // 文件验证
    var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
    var extension = Path.GetExtension(file.FileName).ToLower();
    if (!allowedExtensions.Contains(extension))
    {
        return BadRequest("不支持的文件格式");
    }

    // 大小限制（10MB）
    if (file.Length > 10 * 1024 * 1024)
    {
        return BadRequest("文件大小不能超过10MB");
    }

    // 保存文件
    var uploadsFolder = Path.Combine(_environment.ContentRootPath, "uploads");
    Directory.CreateDirectory(uploadsFolder);

    var uniqueFileName = $"{Guid.NewGuid()}{extension}";
    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }

    return Ok(new { fileName = uniqueFileName });
}
```

### 11.2 文件下载

```csharp
[HttpGet("download/{fileName}")]
public IActionResult Download(string fileName)
{
    var filePath = Path.Combine(_environment.ContentRootPath, "uploads", fileName);

    if (!System.IO.File.Exists(filePath))
    {
        return NotFound();
    }

    var mimeType = "application/octet-stream";
    return PhysicalFile(filePath, mimeType, fileName);
}
```

### 11.3 分页查询

```csharp
public async Task<ActionResult<PagedResult<Blog>>> GetBlogs(
    int page = 1, int pageSize = 10)
{
    var query = _context.Blogs.AsQueryable();

    var totalCount = await query.CountAsync();

    var items = await query
        .OrderByDescending(b => b.CreatedAt)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return Ok(new PagedResult<Blog>
    {
        Items = items,
        TotalCount = totalCount,
        Page = page,
        PageSize = pageSize
    });
}
```

---

## 12. 项目实战

### 12.1 投票系统需求

- 用户可以创建投票主题
- 每个主题包含多个选项
- 用户可以进行投票
- 查看投票结果统计

### 12.2 实体设计

```csharp
// 主题
public class Topic
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<Option> Options { get; set; }
}

// 选项
public class Option
{
    public Guid Id { get; set; }
    public string Content { get; set; }
    public Guid TopicId { get; set; }
    public Topic Topic { get; set; }
    public List<Vote> Votes { get; set; }
}

// 投票记录
public class Vote
{
    public Guid Id { get; set; }
    public Guid OptionId { get; set; }
    public Option Option { get; set; }
    public DateTime VotedAt { get; set; }
}
```

### 12.3 API 设计

| 方法 | 路由 | 说明 |
|------|------|------|
| GET | /api/topics | 获取主题列表 |
| GET | /api/topics/{id} | 获取主题详情 |
| POST | /api/topics | 创建主题 |
| POST | /api/topics/{id}/vote | 投票 |
| GET | /api/topics/{id}/results | 获取投票结果 |

---

## 13. 发布和部署

### 13.1 发布应用

#### 使用 Visual Studio 发布

1. 右键项目 → 发布
2. 选择目标：文件夹
3. 配置发布设置：
   - **框架依赖**：需要安装 .NET Runtime
   - **自包含**：无需安装 Runtime，体积较大
   - **单文件**：打包成单个可执行文件
4. 点击发布

#### 使用命令行发布

```bash
# 框架依赖发布
dotnet publish -c Release -o ./publish

# 自包含发布（Linux）
dotnet publish -c Release -r linux-x64 --self-contained -o ./publish

# 单文件发布
dotnet publish -c Release -r linux-x64 --self-contained -p:PublishSingleFile=true -o ./publish
```

### 13.2 部署到 Windows (IIS)

1. **安装 IIS**
   - 控制面板 → 程序 → 启用或关闭 Windows 功能 → Internet Information Services

2. **安装 .NET Hosting Bundle**
   - 下载并安装 .NET Hosting Bundle

3. **创建网站**
   - 打开 IIS 管理器
   - 右键"网站" → 添加网站
   - 配置物理路径和端口

4. **部署文件**
   - 将发布文件复制到网站物理路径

### 13.3 部署到 Linux

#### 安装运行时

```bash
# Ubuntu
sudo apt-get update
sudo apt-get install -y dotnet-sdk-8.0
```

#### 配置 Systemd 服务

创建服务文件 `/etc/systemd/system/api.service`：

```ini
[Unit]
Description=ASP.NET Core API

[Service]
WorkingDirectory=/var/api
ExecStart=/usr/bin/dotnet /var/api/YourApp.dll
Restart=always
RestartSec=10
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production

[Install]
WantedBy=multi-user.target
```

启动服务：

```bash
sudo systemctl enable api
sudo systemctl start api
sudo systemctl status api
```

#### 配置 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 13.4 Docker 部署

#### Dockerfile

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["YourApp.csproj", "./"]
RUN dotnet restore "YourApp.csproj"
COPY . .
RUN dotnet publish "YourApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "YourApp.dll"]
```

#### 构建和运行

```bash
# 构建镜像
docker build -t your-app .

# 运行容器
docker run -d -p 8080:80 --name your-app your-app
```

---

## 附录：学习资源

### 官方文档

- ASP.NET Core 文档：https://docs.microsoft.com/aspnet/core
- Entity Framework Core：https://docs.microsoft.com/ef/core
- C# 编程指南：https://docs.microsoft.com/dotnet/csharp

### 推荐工具

- Visual Studio 2022
- Visual Studio Code
- Postman / .http 文件测试
- pgAdmin / SQL Server Management Studio

---

## 结语

本教程从 Web 开发的基础概念出发，系统讲解了 ASP.NET Core 的核心功能：

1. 理解 HTTP 协议和 Web 工作原理
2. 掌握请求处理、响应返回的机制
3. 学会使用 EF Core 进行数据库操作
4. 了解常见功能的实现方式
5. 掌握应用的发布和部署

**关键要点**：
- 不要死记硬背，要理解原理
- 多动手实践，通过项目巩固知识
- 遇到问题查阅官方文档
- 技术的本质是解决问题

祝学习顺利！