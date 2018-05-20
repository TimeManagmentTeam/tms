using System;
using Microsoft.AspNetCore.Mvc;
using Tms.Services.TimeStampsService;

namespace Tms.WebUI.Controllers
{
    [Produces("application/json")]
    [Route("api/TimeStamps")]
    public class TimeStampsController : Controller
    {
        private readonly TimeStampsService _service;

        public TimeStampsController(TimeStampsService service)
        {
            _service = service;
        }

        public IActionResult Get(Guid employeerId, DateTime from, DateTime to) => Json(_service.Read(employeerId, from, to));

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(Guid id)
        {
            _service.Delete(id);
            return new ContentResult { Content = id.ToString(), StatusCode = 200 };
        }

        [HttpPost("Add")]
        public IActionResult Add(DtoTimeStamp timeStamp)
        {
            if (ModelState.IsValid)
            {
                if (timeStamp.WorkedTime.TotalSeconds != 0)
                {
                    _service.Create(timeStamp);
                }
                return new ContentResult { Content = timeStamp.ToString(), StatusCode = 200 };
            }

            return BadRequest(ModelState);

        }

        [HttpPost("Update")]
        public IActionResult Update(DtoTimeStamp timeStamp)
        {
            if (ModelState.IsValid)
            {
                if (timeStamp.WorkedTime.TotalSeconds == 0)
                {
                    _service.Delete(timeStamp.Id);
                }
                else
                {
                    _service.Update(timeStamp.Id, timeStamp);
                }

                return new ContentResult { Content = timeStamp.ToString(), StatusCode = 200 };
            }

            return BadRequest(ModelState);
        }
    }
}