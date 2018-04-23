using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tms.Services.EmployeesService;
using Tms.WebUI.Models;

namespace Tms.WebUI.Controllers
{
    public class AuthController : Controller
    {
        private readonly EmployeesService _employeesService;

        public AuthController(EmployeesService service)
        {
            _employeesService = service;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View(new AuthModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(AuthModel model)
        {
            //Проверяем что совпадает логин и пароль
            if (_employeesService.Verify(model.Email, model.PassHash, out var employee))
            {
                // создаем один claim который содержит логин нашего пользователя
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, employee.FirstName),
                    new Claim(ClaimTypes.Email, employee.Email),
                    new Claim(ClaimTypes.Surname, employee.LastName),
                    new Claim("MiddleName", employee.MiddleName),
                    new Claim(ClaimTypes.Role, employee.Role.ToString())
                };

                // создаем объект ClaimsIdentity
                var id = new ClaimsIdentity(claims,
                    "ApplicationCookie",                    //Тип аутентификации
                    ClaimsIdentity.DefaultNameClaimType,    //Ключ который будет использоваться для определении имени пользователя
                    ClaimsIdentity.DefaultRoleClaimType);   //Ключ который будет использоваться для определении роли пользователя

                // установка аутентификационных куки
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));

                return RedirectToAction("Test", "Auth");
            }
            ModelState.AddModelError("", "Некорректные логин и(или) пароль");

            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        [Authorize]
        public IActionResult Test()
        {
            return View(User.Identity);
        }
    }
}