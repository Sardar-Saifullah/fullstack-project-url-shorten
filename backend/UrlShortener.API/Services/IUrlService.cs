using UrlShortener.API.Models;

namespace UrlShortener.API.Services
{
    public interface IUrlService
    {
        Task<Url> CreateShortUrlAsync(string originalUrl);
        Task<Url?> GetUrlByShortCodeAsync(string shortCode);
        Task<string?> GetOriginalUrlAsync(string shortCode);
        Task<Url?> UpdateUrlAsync(string shortCode, string originalUrl);
        Task<bool> DeleteUrlAsync(string shortCode);
        Task<IEnumerable<Url>> GetAllUrlsAsync();
    }
}