namespace Infrastructure.Photos;

public class CloudinarySettings     // Need to match configuration values set in appsettings.json and service in Program.cs
{
    public required string CloudName { get; set; }
    public required string ApiKey { get; set; }
    public required string ApiSecret { get; set; }
}