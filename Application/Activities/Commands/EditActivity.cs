using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync([request.Activity.Id], cancellationToken)        // Makes a call to the DB, gets activity based on ID
                ?? throw new Exception("Cannot find activity");             // If activity not found (returns null for given ID), throw exception

            activity.Title = request.Activity.Title;                     // Need to assign fields from db request to variable for editing; without automapping, set each individually
        
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}