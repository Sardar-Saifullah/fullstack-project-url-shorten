using UrlShortener.API.Models;
using UrlShortener.API.Repository;
using UrlShortener.API.Utilities;

namespace UrlShortener.API.Services
{
    public class UrlService : IUrlService
    {
        private readonly IUrlRepository _urlRepository;

        public UrlService(IUrlRepository urlRepository)
        {
            _urlRepository = urlRepository;
        }

        public async Task<Url> CreateShortUrlAsync(string originalUrl)
        {
            if (!IsValidUrl(originalUrl))
                throw new ArgumentException("Invalid URL format");

            string shortCode;
            Url? existingUrl;

            do
            {
                shortCode = ShortCodeGenerator.Generate();
                existingUrl = await _urlRepository.GetByShortCodeAsync(shortCode);
            } while (existingUrl != null);

            return await _urlRepository.CreateAsync(originalUrl, shortCode);
        }

        public async Task<Url?> GetUrlByShortCodeAsync(string shortCode)
        {
            return await _urlRepository.GetByShortCodeAsync(shortCode);
        }

        public async Task<string?> GetOriginalUrlAsync(string shortCode)
        {
            var url = await _urlRepository.GetAndIncrementAccessCountAsync(shortCode);
            return url?.OriginalUrl;
        }

        public async Task<Url?> UpdateUrlAsync(string shortCode, string originalUrl)
        {
            if (!IsValidUrl(originalUrl))
                throw new ArgumentException("Invalid URL format");

            return await _urlRepository.UpdateAsync(shortCode, originalUrl);
        }

        public async Task<bool> DeleteUrlAsync(string shortCode)
        {
            return await _urlRepository.DeleteAsync(shortCode);
        }

        public async Task<IEnumerable<Url>> GetAllUrlsAsync()
        {
            return await _urlRepository.GetAllAsync();
        }

        private static bool IsValidUrl(string url)
        {
            return Uri.TryCreate(url, UriKind.Absolute, out Uri? uriResult)
                   && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
        }
    }
}