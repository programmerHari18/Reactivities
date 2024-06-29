using Application.Activities;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Application.Profiles.Details.Query{Username = username}));
        }
        [HttpPut]
        public async Task<IActionResult> EditProfile(Application.Profiles.EditProfile.Command command){
            return HandleResult(await Mediator.Send(command));
        }
        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GatherActivities(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListActivities.Query{Username = username, Predicate = predicate}));
        }
    }
}