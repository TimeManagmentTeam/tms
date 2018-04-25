using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
        public JsonResult Login(AuthModel model)
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

                //Создаём токен
                var token = new JwtSecurityToken(
                    issuer: Startup.AuthOptions.Issuer,
                    audience: Startup.AuthOptions.Audience,
                    notBefore: DateTime.Now,
                    claims: claims,
                    expires: DateTime.Now.Add(TimeSpan.FromMinutes(Startup.AuthOptions.Lifetime)),
                    signingCredentials: new SigningCredentials(Startup.AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

                //Возвращаем токен пользователю
                return Json(new
                {
                    IsSuccess = true,
                    Token = encodedToken
                });
            }

            return Json(new
            {
                IsSuccess = false
            });
        }

        [HttpGet]
        [Authorize]
        public IActionResult Test()
        {
            return View(User.Identity);
        }
    }
}