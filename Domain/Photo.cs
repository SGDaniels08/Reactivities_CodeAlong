using System.Text.Json.Serialization;

namespace Domain;

public class Photo
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Url { get; set; }
    public required string PublicId { get; set; }

    // Include User information on Photo object, EF migrations will handle cascade deletions (i.e., if we delete a user, all pictures will be deleted as well)
    public required string UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; } = null!;         // This will cause problems with JSON serializer (recursive cascade, like with ActivityAttendees)
                                                    // Can make DTO, or use [JsonIgnore] annotation
}