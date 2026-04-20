using System;
using Application.Activities.DTO;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<string>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    // IMapper injection is needed for handling DTO, IValidator comes from Fluent Validation for validating DTO
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            // Validation changed to middleware in Program.cs, using ValidationBehavior class
            //await validator.ValidateAndThrowAsync(request, cancellationToken);

            // Rather than returning the actual request activity, we'll
            // map the DTO to an activity and return what we need from that
            var activity = mapper.Map<Activity>(request.ActivityDto);
            

            //context.Activities.Add(request.Activity);
            context.Activities.Add(activity);

            await context.SaveChangesAsync(cancellationToken);

            //return request.Activity.Id;
            return activity.Id;
        }
    }
}
