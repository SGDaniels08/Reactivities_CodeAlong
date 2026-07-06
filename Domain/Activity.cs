using System;
using System.Runtime.ConstrainedExecution;

namespace Domain;

// Each property in class will correspond to a column in a table
public class Activity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }

    // location props
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    // navigation properties - will configure many-to-many relationship between this and Activities collection in User.cs
    // When new EF migration is made, adds join table ActivityUser automatically
    //public ICollection<User> Attendees { get; set; } = [];

    // This list of ActivityAttendee entities causes an infinite loop with EF, replace it with DTO
    public ICollection<ActivityAttendee> Attendees { get; set; } = [];
}
