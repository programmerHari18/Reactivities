using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> Add([FromForm] Add.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpDelete("{Id}")]
        public async Task<ActionResult> Delete(string Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = Id}));
        }
        [HttpPost("{id}/setMain")]
        public async Task<ActionResult> setMain(string id)
        {
            return HandleResult(await Mediator.Send(new SetMain.Command{Id= id}));
        }
    }
}