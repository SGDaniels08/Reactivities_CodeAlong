using System.Diagnostics;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    // public class Command : IRequest      // <-- without typing, this HTTP request object does not return anything
    public class Command : IRequest<Result<Unit>>       // <-- This means the Delete HTTP request will return a Unit (a void data type in MediatR)    {
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>     // <-- cf. class declaration above
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync([request.Id], cancellationToken);

            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

            context.Remove(activity);

            //await context.SaveChangesAsync(cancellationToken);   // <-- moving to a variable to more easily return special object      
            var result = await context.SaveChangesAsync(cancellationToken) > 0;         // <-- SaveChangesAsync returns a number indicating howm any tasks 
                                                                                        // were written to the database. If not grater than zero, nothing needs done
            if (!result) return Result<Unit>.Failure("Failed to delete the activity", 400);

            return Result<Unit>.Success(Unit.Value);
        }                                                                               
    }
}
