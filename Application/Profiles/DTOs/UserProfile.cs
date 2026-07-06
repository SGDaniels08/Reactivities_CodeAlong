using System;

namespace Application.Profiles.DTOs;

// This will be passed to the ActivityDTO list of attendees instead of ActivityAttendee object, to avoid recursive cascade
// Will be user's publicly visible profile
public class UserProfile
{
    public required string Id { get; set; }
    public required string DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
}