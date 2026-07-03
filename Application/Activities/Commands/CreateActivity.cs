using System;
using Application.Activities.DTO;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    // IMapper injection is needed for handling DTO, IValidator comes from Fluent Validation for validating DTO
    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) 
        : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();

            // Validation changed to middleware in Program.cs, using ValidationBehavior class
            //await validator.ValidateAndThrowAsync(request, cancellationToken);

            // Rather than returning the actual request activity, we'll
            // map the DTO to an activity and return what we need from that
            var activity = mapper.Map<Activity>(request.ActivityDto);               // <-- AutoMapper will throw an exception if this fails, no need for exception handling
            

            //context.Activities.Add(request.Activity);
            context.Activities.Add(activity);                                       // <-- handled in memory by EF, no need for error checking

            // The person who creates the activity is defaulted as the host
            var attendee = new ActivityAttendee
            {
                ActivityId = activity.Id,
                UserId = user.Id,
                IsHost = true
            };

            activity.Attendees.Add(attendee);
            
            //await context.SaveChangesAsync(cancellationToken);

            // //return request.Activity.Id;
            //return activity.Id;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to create the activity", 400);

            return Result<string>.Success(activity.Id);
        }
    }
}
