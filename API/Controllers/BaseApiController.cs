using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator Mediator => 
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
                ?? throw new InvalidOperationException("IMediator service is unavailable");

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (!result.IsSuccess && result.Code == 404) return NotFound();

            // Typed functions are tricky, to return an typed ActionResult<T> here, you could use:
            //
            // if (result.IsSuccess && result.Value != null) return result.Value;
            // For untyped ActionResult:
        
            if (result.IsSuccess && result.Value != null) return Ok(result.Value);
            
            return BadRequest(result.Error);
        }
    }
}
