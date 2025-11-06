using UrlShortener.API.Models;

namespace UrlShortener.API.Repository
{
    public interface IUrlRepository
    {
        Task<Url> CreateAsync(string originalUrl, string shortCode);
        Task<Url?> GetByShortCodeAsync(string shortCode);
        Task<Url?> GetAndIncrementAccessCountAsync(string shortCode);
        Task<Url?> UpdateAsync(string shortCode, string originalUrl);
        Task<bool> DeleteAsync(string shortCode);
        Task<IEnumerable<Url>> GetAllAsync();
    }
}