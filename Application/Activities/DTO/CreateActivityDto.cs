using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Activities.DTO;

/// <summary>
//  This class is used for error handling with the API
//  If we send a bad ID, we don't want to return the system error, because it's dificult to decipher
//  A DTO (Data Transfer Object) allows us to capture the information we need and send back a controlled response to bad data
//  Will be incorporated into the Mediator between the Application layer and the API layer
//  This approach uses Fluent Validation, compare with method using Annotations
/// </summary>
public class CreateActivityDto : BaseActivityDto
{
    // Moved to BaseActivityDto.cs

    // public string Title { get; set; } = "";         // string.Empty will also work for default empty string
    // public DateTime Date { get; set; }
    // public string Description { get; set; } = string.Empty;
    // public string Category { get; set; } = "";
    // //public bool IsCancelled { get; set; }

    // // location props
    // public string City { get; set; } = "";
    // public string Venue { get; set; } = "";
    // public double Latitude { get; set; }
    // public double Longitude { get; set; }
}
