using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<Activity>>     // Instead of returning an Activity, returning Result of type Activity
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities         // Related data (ActivityAttendees) is not pulled automatically by EF
            .Include(x => x.Attendees)                      // This will eagerly load attendee data when event is pulled up
            .ThenInclude(x => x.User)                       // .Include only gets Id, need to convert that to User objects
            //.FindAsync([request.Id], cancellationToken);  // Eager .Include does not work with FindAsync, need FirstOrDefaultAsync
            .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);
            // Can also use lazy loading, more like a global config, will get related data for everything and bring down performance

            //if (activity == null) throw new Exception("Activity not found");
            if (activity == null) return Result<Activity>.Failure("Activity not found", 404);

            return Result<Activity>.Success(activity);
        }
    }
}
