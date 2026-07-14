using System;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

// Because we have an interface, and it has been implemented, we need to add this as a service in Program.cs
public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {
        return await dbContext.Users.FindAsync(GetUserId())                     // Will not return collection of photos, need another
            ?? throw new UnauthorizedAccessException("No user is logged in");   // method for deleting photos
    }

    public async Task<User> GetUserWithPhotosAsync()
    {
        var userId = GetUserId();
        return await dbContext.Users            // Cannot use .Include() with FindAsync(), because it 
            .Include(x => x.Photos)             // does not work with eager loading                
            .FirstOrDefaultAsync(x => x.Id == userId)
                ?? throw new UnauthorizedAccessException("No user is logged in");   
    }

    public string GetUserId()
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new Exception("No user found");
    }
}