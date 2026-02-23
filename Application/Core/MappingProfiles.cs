using Domain;
using AutoMapper;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();                    // Tells automapper that it will be mapping one object of type Domain.Activity to another object of the same type
    }
}
