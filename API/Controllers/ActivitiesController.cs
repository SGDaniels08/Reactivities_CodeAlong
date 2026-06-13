using Application.Activities.Commands;
using Application.Activities.DTO;
using Application.Activities.Queries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    // [HttpGet]       // Sample version using Cancellation Token (also need changes in Handler file)
    // public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
    // {
    //     return await Mediator.Send(new GetActivityList.Query(), ct);
    // }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        // Commented out for exception handling
        // return await Mediator.Send(new GetActivityDetails.Query{Id = id});

        // // For exception handling, have to account for all exception types
        // // Could just use the following here:
        // //
        // // if (activity == null) return NotFound();
        // //
        // // This will give us the correct HTTP response, but gives too much responsibility to API controller
        // // Better job for application layer, send API layer a special object indicating success or failure
        // // See "Reactivities/Application/Activities/Queries/GetActivityDetails.cs"


        // var result = await Mediator.Send(new GetActivityDetails.Query{Id = id});

        // // The following would be needed for every API controller        
        // if (!result.IsSuccess && result.Code == 404) return NotFound();

        // if (result.IsSuccess && result.Value != null) return result.Value;
        
        // return BadRequest(result.Error);

        // // Better to move the logic to BaseAPIController

        return HandleResult(await Mediator.Send(new GetActivityDetails.Query{Id = id}));
    }

    [HttpPost]
    // Needs CreateActivityDTO passed instead of the regular Activity object, for error handling
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
    {
        //return await Mediator.Send(new CreateActivity.Command{Activity = activity});
        return HandleResult(await Mediator.Send(new CreateActivity.Command{ActivityDto = activityDto}));
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDto activity)
    {
        return HandleResult(await Mediator.Send(new EditActivity.Command{ActivityDto = activity}));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command{Id = id}));
    }
}
