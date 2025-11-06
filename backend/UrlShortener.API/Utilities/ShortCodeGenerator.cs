namespace UrlShortener.API.Utilities
{
    public static class ShortCodeGenerator
    {
        private const string Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        private static readonly Random Random = new();

        public static string Generate(int length = 6)
        {
            var chars = new char[length];
            for (int i = 0; i < length; i++)
            {
                chars[i] = Characters[Random.Next(Characters.Length)];
            }
            return new string(chars);
        }
    }   
}