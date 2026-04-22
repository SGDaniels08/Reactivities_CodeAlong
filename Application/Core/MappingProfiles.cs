using Domain;
using AutoMapper;
using Application.Activities.DTO;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();                    // Tells automapper that it will be mapping one object of type Domain.Activity to another object of the same type
        CreateMap<CreateActivityDto, Activity>();           // Maps DTO to actual Activity object. DTO will need to be used now in Create Activity handler
        CreateMap<EditActivityDto, Activity>();        
    }
}
