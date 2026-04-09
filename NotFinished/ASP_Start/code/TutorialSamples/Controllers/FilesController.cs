using Microsoft.AspNetCore.Mvc;

namespace TutorialSamples.Controllers;

/// <summary>
/// 文件控制器（第11章 文件上传下载示例）
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class FilesController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<FilesController> _logger;

    public FilesController(IWebHostEnvironment environment, ILogger<FilesController> logger)
    {
        _environment = environment;
        _logger = logger;
    }

    /// <summary>
    /// 单文件上传（第11章 基础上传示例）
    /// </summary>
    [HttpPost("upload")]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { message = "未选择文件" });
        }

        // 验证文件大小（限制10MB）
        const long maxFileSize = 10 * 1024 * 1024;
        if (file.Length > maxFileSize)
        {
            return BadRequest(new { message = "文件大小不能超过10MB" });
        }

        // 验证文件类型
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".txt" };
        var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(fileExtension))
        {
            return BadRequest(new { message = "不支持的文件类型" });
        }

        // 创建上传目录
        var uploadsFolder = Path.Combine(_environment.ContentRootPath, "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        // 生成唯一文件名
        var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        // 保存文件
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        _logger.LogInformation("文件上传成功: {FileName}", file.FileName);

        return Ok(new
        {
            message = "上传成功",
            originalName = file.FileName,
            savedName = uniqueFileName,
            size = file.Length,
            contentType = file.ContentType
        });
    }

    /// <summary>
    /// 多文件上传（第11章）
    /// </summary>
    [HttpPost("upload-multiple")]
    public async Task<IActionResult> UploadMultipleFiles(List<IFormFile> files)
    {
        if (files == null || files.Count == 0)
        {
            return BadRequest(new { message = "未选择文件" });
        }

        // 限制文件数量
        if (files.Count > 5)
        {
            return BadRequest(new { message = "一次最多上传5个文件" });
        }

        var uploadsFolder = Path.Combine(_environment.ContentRootPath, "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var results = new List<object>();
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".txt" };

        foreach (var file in files)
        {
            if (file.Length == 0) continue;

            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(fileExtension))
            {
                results.Add(new { originalName = file.FileName, success = false, error = "不支持的文件类型" });
                continue;
            }

            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            results.Add(new
            {
                originalName = file.FileName,
                savedName = uniqueFileName,
                size = file.Length,
                success = true
            });
        }

        return Ok(new { message = $"成功上传 {results.Count} 个文件", files = results });
    }

    /// <summary>
    /// 文件下载（第11章）
    /// </summary>
    [HttpGet("download/{fileName}")]
    public IActionResult DownloadFile(string fileName)
    {
        var uploadsFolder = Path.Combine(_environment.ContentRootPath, "uploads");
        var filePath = Path.Combine(uploadsFolder, fileName);

        if (!System.IO.File.Exists(filePath))
        {
            return NotFound(new { message = "文件不存在" });
        }

        // 安全检查：确保文件在上传目录内
        var fullPath = Path.GetFullPath(filePath);
        var uploadsPath = Path.GetFullPath(uploadsFolder);
        if (!fullPath.StartsWith(uploadsPath))
        {
            return BadRequest(new { message = "非法路径" });
        }

        // 获取文件内容类型
        var contentType = GetContentType(fileName);

        return PhysicalFile(filePath, contentType, fileName);
    }

    /// <summary>
    /// 获取文件列表
    /// </summary>
    [HttpGet("list")]
    public IActionResult ListFiles()
    {
        var uploadsFolder = Path.Combine(_environment.ContentRootPath, "uploads");

        if (!Directory.Exists(uploadsFolder))
        {
            return Ok(new { files = new List<object>() });
        }

        var files = Directory.GetFiles(uploadsFolder)
            .Select(filePath =>
            {
                var fileInfo = new FileInfo(filePath);
                return new
                {
                    name = fileInfo.Name,
                    size = fileInfo.Length,
                    createdAt = fileInfo.CreationTimeUtc,
                    lastModified = fileInfo.LastWriteTimeUtc
                };
            })
            .OrderByDescending(f => f.createdAt)
            .ToList();

        return Ok(new { count = files.Count, files });
    }

    /// <summary>
    /// 删除文件
    /// </summary>
    [HttpDelete("{fileName}")]
    public IActionResult DeleteFile(string fileName)
    {
        var uploadsFolder = Path.Combine(_environment.ContentRootPath, "uploads");
        var filePath = Path.Combine(uploadsFolder, fileName);

        if (!System.IO.File.Exists(filePath))
        {
            return NotFound(new { message = "文件不存在" });
        }

        // 安全检查
        var fullPath = Path.GetFullPath(filePath);
        var uploadsPath = Path.GetFullPath(uploadsFolder);
        if (!fullPath.StartsWith(uploadsPath))
        {
            return BadRequest(new { message = "非法路径" });
        }

        System.IO.File.Delete(filePath);
        return NoContent();
    }

    /// <summary>
    /// 流式上传（大文件上传，第11章）
    /// </summary>
    [HttpPost("upload-stream")]
    [RequestSizeLimit(100 * 1024 * 1024)] // 限制100MB
    public async Task<IActionResult> UploadStream(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { message = "未选择文件" });
        }

        var uploadsFolder = Path.Combine(_environment.ContentRootPath, "uploads", "large");
        Directory.CreateDirectory(uploadsFolder);

        var safeFileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(uploadsFolder, safeFileName);

        // 使用流式复制，避免内存缓冲
        await using var fileStream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(fileStream);

        _logger.LogInformation("流式上传完成: {FileName}, 大小: {Size} bytes", file.FileName, file.Length);

        return Ok(new
        {
            message = "流式上传完成",
            originalName = file.FileName,
            savedName = safeFileName,
            size = file.Length
        });
    }

    /// <summary>
    /// 获取文件内容类型
    /// </summary>
    private static string GetContentType(string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        return extension switch
        {
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".pdf" => "application/pdf",
            ".txt" => "text/plain",
            ".doc" => "application/msword",
            ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".xls" => "application/vnd.ms-excel",
            ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            _ => "application/octet-stream"
        };
    }
}