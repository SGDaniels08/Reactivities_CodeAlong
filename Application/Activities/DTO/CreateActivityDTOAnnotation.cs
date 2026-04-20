using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Activities.DTO;

/// <summary>
//  This class is used for error handling with the API
//  If we send a bad ID, we don't want to return the system error, because it's dificult to decipher
//  A DTO (Data Transfer Object) allows us to capture the information we need and send back a controlled response to bad data
//  Will be incorporated into the Mediator between the Application layer and the API layer
//  Easiest with data annotations, confirm HTTP response in Postman
//  Actual validation handled in BaseAPIController, based on [ApiController] attribute
//  However, this violates clean approach somewhat, will move validation from HTTP layer to Application layer
//  Not the final approach in the app, a demo of how to set up annotations
/// </summary>
public class CreateActivityDtoAnnotation
{
    // The "required" keyword is problematic for DTOs, since we may only be checking against one field. 
    // Remove them from DTO, replate with [Required] annotation and default value
    [Required]
    public string Title { get; set; } = "";         // string.Empty will also work for default empty string
    [Required]
    public DateTime Date { get; set; }
    [Required]
    public string Description { get; set; } = string.Empty;
    [Required]
    public string Category { get; set; } = "";
    //public bool IsCancelled { get; set; }

    // location props
    [Required]
    public string City { get; set; } = "";
    [Required]
    public string Venue { get; set; } = "";
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
