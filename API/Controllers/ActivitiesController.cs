using Application.Activities.Commands;
using Application.Activities.DTO;
using Application.Activities.Queries;
using Domain;
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
        return await Mediator.Send(new GetActivityDetails.Query{Id = id});
    }

    [HttpPost]
    // Needs CreateActivityDTO passed instead of the regular Activity object, for error handling
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
    {
        //return await Mediator.Send(new CreateActivity.Command{Activity = activity});
        return await Mediator.Send(new CreateActivity.Command{ActivityDto = activityDto});
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(Activity activity)
    {
        await Mediator.Send(new EditActivity.Command{Activity = activity});
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        await Mediator.Send(new DeleteActivity.Command{Id = id});
        return Ok();
    }
}
