using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Tms.WebUI.Controllers
{
    public class Employee
    {
        [Required]
        public int Id { get; set; }

        [Required(ErrorMessage = "Имя - обязательное поле")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Фамилия - обязательное поле")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Отчество - обязательное поле")]
        public string Patronymic { get; set; }
    }

    [Produces("application/json")]
    [Route("api/Employees")]
    public class EmployeesController : Controller
    {
        static List<Employee> Employees = new List<Employee>
        {
            new Employee
            {
                Id = 1, FirstName = "Кирилл", LastName = "Грехов", Patronymic = "Юрьевич"
            },
            new Employee
            {
                Id = 2, FirstName = "Кирилл", LastName = "Грехов", Patronymic = "Юрьевич"
            },
            new Employee
            {
                Id = 3, FirstName = "Чёрт", LastName = "Чёрт", Patronymic = "Чёрт"
            }
        };
        
        [HttpGet]
        public IActionResult GetAll() => Json(Employees);

        [HttpPost("Remove/{id}")]
        public IActionResult Remove(int id)
        {
            Employees.RemoveAll(x => x.Id == id);
            return new ContentResult { Content = id.ToString(), StatusCode = 200 };
        }

        [HttpPost("Add")]
        public IActionResult Add(Employee employee)
        {
            if (ModelState.IsValid)
            {
                var id = 0;
                if (Employees.Count > 0)
                {
                    id = Employees[Employees.Count - 1].Id + 1;
                }
                employee.Id = id;
                Employees.Add(employee);
                return new ContentResult { Content = id.ToString(), StatusCode = 200 };
            }

            return BadRequest(ModelState);

        }

        [HttpPost("Edit")]
        public IActionResult Edit(Employee employee)
        {
            if (ModelState.IsValid)
            {
                var index = Employees.FindIndex(x => x.Id == employee.Id);
                Employees[index] = employee;
                return new ContentResult { Content = index.ToString(), StatusCode = 200 };
            }

            return BadRequest(ModelState);
        }
    }
}