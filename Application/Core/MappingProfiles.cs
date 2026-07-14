using Domain;
using AutoMapper;
using Application.Activities.DTO;
using Application.Profiles.DTOs;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();                    // Tells automapper that it will be mapping one object of type Domain.Activity to another object of the same type
        CreateMap<CreateActivityDto, Activity>();           // Maps DTO to actual Activity object. DTO will need to be used now in Create Activity handler
        CreateMap<EditActivityDto, Activity>(); 
        CreateMap<Activity, ActivityDto>()                  // The properties in ActivityDto that are not in Activity must be explicitly handled
            .ForMember(d => d.HostDisplayName, o => o.MapFrom(s => 
                s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
            .ForMember(d => d.HostId, o => o.MapFrom(s => 
                s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));    
        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))       
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))       
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))       
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id));
        CreateMap<User, UserProfile>();   
    }
}
