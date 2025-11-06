using Microsoft.AspNetCore.Mvc;
using UrlShortener.API.Models;
using UrlShortener.API.Services;

namespace UrlShortener.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UrlController : ControllerBase
    {
        private readonly IUrlService _urlService;
        private readonly ILogger<UrlController> _logger;

        public UrlController(IUrlService urlService, ILogger<UrlController> logger)
        {
            _urlService = urlService;
            _logger = logger;
        }

        // POST: api/url/shorten
        [HttpPost("shorten")]
        public async Task<IActionResult> CreateShortUrl([FromBody] CreateUrlRequest request)
        {
            try
            {
                _logger.LogInformation($"Creating short URL for: {request.Url}");

                if (string.IsNullOrWhiteSpace(request.Url))
                {
                    return BadRequest(new { error = "URL is required" });
                }

                var url = await _urlService.CreateShortUrlAsync(request.Url);

                // Return the created URL directly instead of using CreatedAtAction
                return Ok(new
                {
                    message = "Short URL created successfully",
                    data = url
                });
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning($"Invalid URL: {request.Url} - {ex.Message}");
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating short URL: {ex.Message}");
                return StatusCode(500, new { error = "Internal server error" });
            }
        }

        // GET: api/url/{shortCode}
        [HttpGet("{shortCode}")]
        public async Task<IActionResult> GetUrlByShortCode(string shortCode)
        {
            try
            {
                _logger.LogInformation($"Getting URL for short code: {shortCode}");

                var url = await _urlService.GetUrlByShortCodeAsync(shortCode);
                if (url == null)
                {
                    _logger.LogWarning($"Short URL not found: {shortCode}");
                    return NotFound(new { error = "Short URL not found" });
                }

                return Ok(url);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting URL: {ex.Message}");
                return StatusCode(500, new { error = "Internal server error" });
            }
        }

        // GET: api/url/{shortCode}/redirect
        [HttpGet("{shortCode}/redirect")]
        public async Task<IActionResult> RedirectToOriginalUrl(string shortCode)
        {
            try
            {
                _logger.LogInformation($"Redirecting for short code: {shortCode}");

                var originalUrl = await _urlService.GetOriginalUrlAsync(shortCode);
                if (string.IsNullOrEmpty(originalUrl))
                {
                    _logger.LogWarning($"Short URL not found for redirect: {shortCode}");
                    return NotFound(new { error = "Short URL not found" });
                }

                _logger.LogInformation($"Redirecting to: {originalUrl}");
                return Redirect(originalUrl);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error redirecting: {ex.Message}");
                return StatusCode(500, new { error = "Internal server error" });
            }
        }

        // PUT: api/url/{shortCode}
        [HttpPut("{shortCode}")]
        public async Task<IActionResult> UpdateUrl(string shortCode, [FromBody] UpdateUrlRequest request)
        {
            try
            {
                _logger.LogInformation($"Updating URL for short code: {shortCode}");

                if (string.IsNullOrWhiteSpace(request.Url))
                {
                    return BadRequest(new { error = "URL is required" });
                }

                var url = await _urlService.UpdateUrlAsync(shortCode, request.Url);
                if (url == null)
                {
                    _logger.LogWarning($"Short URL not found for update: {shortCode}");
                    return NotFound(new { error = "Short URL not found" });
                }

                return Ok(new
                {
                    message = "URL updated successfully",
                    data = url
                });
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning($"Invalid URL for update: {request.Url} - {ex.Message}");
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating URL: {ex.Message}");
                return StatusCode(500, new { error = "Internal server error" });
            }
        }

        // DELETE: api/url/{shortCode}
        [HttpDelete("{shortCode}")]
        public async Task<IActionResult> DeleteUrl(string shortCode)
        {
            try
            {
                _logger.LogInformation($"Deleting URL for short code: {shortCode}");

                var deleted = await _urlService.DeleteUrlAsync(shortCode);
                if (!deleted)
                {
                    _logger.LogWarning($"Short URL not found for deletion: {shortCode}");
                    return NotFound(new { error = "Short URL not found" });
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting URL: {ex.Message}");
                return StatusCode(500, new { error = "Internal server error" });
            }
        }

        // GET: api/url
        [HttpGet]
        public async Task<IActionResult> GetAllUrls()
        {
            try
            {
                _logger.LogInformation("Getting all URLs");

                var urls = await _urlService.GetAllUrlsAsync();
                return Ok(urls);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting all URLs: {ex.Message}");
                return StatusCode(500, new { error = "Internal server error" });
            }
        }
    }
}