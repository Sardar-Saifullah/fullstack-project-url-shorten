using System;

namespace UrlShortener.API.Models
{
    public class Url
    {
        public int Id { get; set; }
        public string OriginalUrl { get; set; } = string.Empty;
        public string ShortCode { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int AccessCount { get; set; }
    }

    public class CreateUrlRequest
    {
        public string Url { get; set; } = string.Empty;
    }

    public class UpdateUrlRequest
    {
        public string Url { get; set; } = string.Empty;
    }
}