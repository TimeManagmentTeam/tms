using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Tms.Services.EmployeesService;

namespace Tms.WebUI.Controllers
{
    [Produces("application/json")]
    [Route("api/Employees")]
    public class EmployeesController : Controller
    {
        private readonly EmployeesService _service;

        public EmployeesController(EmployeesService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll() => Json(_service.GetAll());

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(Guid id)
        {
            _service.Delete(id);
            return new ContentResult { Content = id.ToString(), StatusCode = 200 };
        }

        [HttpPost("Add")]
        public IActionResult Add(DtoEmployee employee)
        {
            if (ModelState.IsValid)
            {
                _service.Create(employee);
                return new ContentResult { Content = employee.ToString(), StatusCode = 200 };
            }

            return BadRequest(ModelState);

        }

        [HttpPost("Edit")]
        public IActionResult Edit(DtoEmployee employee)
        {
            if (ModelState.IsValid)
            {
                _service.Update(employee.Id, employee);
                return new ContentResult { Content = employee.ToString(), StatusCode = 200 };
            }

            return BadRequest(ModelState);
        }
    }
}