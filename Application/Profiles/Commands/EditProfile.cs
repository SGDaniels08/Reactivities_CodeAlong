using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required UserProfile ProfileDto { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();

            if (user == null) return Result<Unit>.Failure("User not found", 404);

            user.DisplayName = request.ProfileDto.DisplayName;
            user.Bio = request.ProfileDto.Bio;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
        
            if (!result) return Result<Unit>.Failure("Failed to update profile", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}