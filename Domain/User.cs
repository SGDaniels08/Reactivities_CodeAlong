using System;
using Microsoft.AspNetCore.Identity;

namespace Domain;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }

    // navigation properties - will configure many-to-many relationship between this and Attendees collection in Activity.cs
    // When new EF migration is made, adds join table ActivityUser automatically
    //public ICollection<Activity> Activities { get; set; } = [];

    public ICollection<ActivityAttendee> Activities { get; set; } = [];
}