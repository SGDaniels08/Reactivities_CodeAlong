using Application.Activities.DTO;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>           // <-- cf. DeleteActivity.cs, "Unit" = void
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync([request.ActivityDto.Id], cancellationToken);                       // Makes a call to the DB, gets activity based on ID
                                                                                            // If activity not found (returns null for given ID), throw exception
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

            //activity.Title = request.Activity.Title;                                      // Need to assign fields from db request to variable for editing; without automapping, set each individually
        
            mapper.Map(request.ActivityDto, activity);                                         // Takes all fields from request object and maps it to db variable

            var result = await context.SaveChangesAsync(cancellationToken) > 0;             // Save the automapped changes into db

            if (!result) return Result<Unit>.Failure("Failed to update the activity", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}