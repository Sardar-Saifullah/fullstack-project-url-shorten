using Dapper;
using MySql.Data.MySqlClient;
using UrlShortener.API.Models;
using Microsoft.Extensions.Logging;

namespace UrlShortener.API.Repository
{
    public class UrlRepository : IUrlRepository
    {
        private readonly string _connectionString;
        private readonly ILogger<UrlRepository> _logger;

        public UrlRepository(IConfiguration configuration, ILogger<UrlRepository> logger)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")!;
            _logger = logger;
        }

        public async Task<Url> CreateAsync(string originalUrl, string shortCode)
        {
            using var connection = new MySqlConnection(_connectionString);

            _logger.LogInformation($"Creating short URL - Original: {originalUrl}, ShortCode: {shortCode}");

            // First, let's see what the stored procedure actually returns
            var result = await connection.QueryFirstOrDefaultAsync<Url>(
                "CreateShortUrl",
                new { p_original_url = originalUrl, p_short_code = shortCode },
                commandType: System.Data.CommandType.StoredProcedure
            );

            if (result == null)
                throw new Exception("Failed to create short URL");

            _logger.LogInformation($"Created URL - Id: {result.Id}, OriginalUrl: {result.OriginalUrl}, ShortCode: {result.ShortCode}");

            return result;
        }

        public async Task<Url?> GetByShortCodeAsync(string shortCode)
        {
            using var connection = new MySqlConnection(_connectionString);

            _logger.LogInformation($"Getting URL for short code: {shortCode}");

            var result = await connection.QueryFirstOrDefaultAsync<Url>(
                "GetUrlByShortCode",
                new { p_short_code = shortCode },
                commandType: System.Data.CommandType.StoredProcedure
            );

            if (result != null)
            {
                _logger.LogInformation($"Found URL - Id: {result.Id}, OriginalUrl: {result.OriginalUrl}, ShortCode: {result.ShortCode}");
            }
            else
            {
                _logger.LogWarning($"No URL found for short code: {shortCode}");
            }

            return result;
        }

        // ... rest of your methods remain the same
        public async Task<Url?> GetAndIncrementAccessCountAsync(string shortCode)
        {
            using var connection = new MySqlConnection(_connectionString);

            var result = await connection.QueryFirstOrDefaultAsync<Url>(
                "GetUrlAndIncrementCount",  // Use your existing stored procedure
                new { p_short_code = shortCode },
                commandType: System.Data.CommandType.StoredProcedure
            );

            if (result != null)
            {
                _logger.LogInformation($"Incremented access count for: {shortCode}");
            }

            return result;
        }

        public async Task<Url?> UpdateAsync(string shortCode, string originalUrl)
        {
            using var connection = new MySqlConnection(_connectionString);

            _logger.LogInformation($"Updating URL - ShortCode: {shortCode}, New URL: {originalUrl}");

            var result = await connection.QueryFirstOrDefaultAsync<Url>(
                "UpdateUrl",
                new { p_short_code = shortCode, p_original_url = originalUrl },
                commandType: System.Data.CommandType.StoredProcedure
            );

            if (result != null)
            {
                _logger.LogInformation($"Updated URL - Id: {result.Id}, OriginalUrl: {result.OriginalUrl}");
            }

            return result;
        }

        public async Task<bool> DeleteAsync(string shortCode)
        {
            using var connection = new MySqlConnection(_connectionString);
            var affectedRows = await connection.ExecuteAsync(
                "DeleteUrl",
                new { p_short_code = shortCode },
                commandType: System.Data.CommandType.StoredProcedure
            );

            _logger.LogInformation($"Deleted {affectedRows} rows for short code: {shortCode}");

            return affectedRows > 0;
        }

        public async Task<IEnumerable<Url>> GetAllAsync()
        {
            using var connection = new MySqlConnection(_connectionString);
            var results = await connection.QueryAsync<Url>(
                "GetAllUrls",
                commandType: System.Data.CommandType.StoredProcedure
            );

            _logger.LogInformation($"Retrieved {results.Count()} URLs from database");

            return results;
        }
    }
}