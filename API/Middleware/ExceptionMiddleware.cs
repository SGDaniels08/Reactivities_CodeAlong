using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware : IMiddleware // Because using this base class, have to mention the service in Program.cs
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception ex)
        {
            
            Console.WriteLine(ex);
        }
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    // validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToList();       // error
                    // validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();      // works, but recommends collection expression

                    // collection expression
                    validationErrors[error.PropertyName] = [.. existingErrors, error.ErrorMessage];
                }
                else
                {
                    // older style of initiating arrays
                    //validationErrors[error.PropertyName] = new [] {error.ErrorMessage};
                    
                    // initiating collections with collection expressions
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }

        // reach into HTTP response to get information
        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        // model exception contents after Microsoft APIController attribute functionality
        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "ValidationFailure",
            Title = "Validation error",
            Detail = "One or more validation errors hass occurred"
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}
