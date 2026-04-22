using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware (ILogger<ExceptionMiddleware> logger, IHostEnvironment env): IMiddleware // Because using this base class, have to mention the service in Program.cs
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
            
            await HandleException(context, ex);
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = env.IsDevelopment()
            ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new AppException(context.Response.StatusCode, ex.Message, null);  // <-- else, in production

        var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};     // <-- need this if outside API, otherwise defaults to Pascal case
    
        var json = JsonSerializer.Serialize(response, options);

        await context.Response.WriteAsJsonAsync(json);
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
            Detail = "One or more validation errors has occurred"
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}
