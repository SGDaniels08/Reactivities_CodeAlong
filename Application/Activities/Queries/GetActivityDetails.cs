using Application.Activities.DTO;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<ActivityDto>>     // Instead of returning an Activity, returning Result of type ActivityDto
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<ActivityDto>>
    {
        public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities         // Related data (ActivityAttendees) is not pulled automatically by EF
            //.Include(x => x.Attendees)                      // This will eagerly load attendee data when event is pulled up
            //.ThenInclude(x => x.User)                       // .Include only gets Id, need to convert that to User objects
            //.FindAsync([request.Id], cancellationToken);  // Eager .Include does not work with FindAsync, need FirstOrDefaultAsync
            // 
            // Don't need to use eager loading at all, can instead use projection from database level
            // Basically just selecting properties from entity
            .ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);
            // Can also use lazy loading, more like a global config, will get related data for everything and bring down performance

            //if (activity == null) throw new Exception("Activity not found");
            if (activity == null) return Result<ActivityDto>.Failure("Activity not found", 404);

            //return Result<ActivityDto>.Success(mapper.Map<ActivityDto>(activity));  // Will map Activity properties into ActivityDto with AutoMapper and eager loading
            return Result<ActivityDto>.Success(activity);   // Properties already chosen from ProjectTo<> above
        }
    }
}
