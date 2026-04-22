using System;

namespace Application.Core;

public class AppException(int statusCode, string message, string? details)      // <-- "details" will be stack trace, but only return minimal info in production
{
    public int StatusCode { get; set; } = statusCode;
    public string Message { get; set; } = message;
    public string? Details { get; set; } = details;
}
