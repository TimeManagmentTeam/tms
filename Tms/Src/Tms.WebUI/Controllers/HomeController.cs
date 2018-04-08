using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Tms.Services.Test.Interfaces;
using Tms.WebUI.Models;
using System.Collections.Generic;

namespace Tms.WebUI.Controllers
{
    public class HomeController : Controller
    {
        private readonly ITestService _testService;

        public HomeController(ITestService testService)
        {
            _testService = testService;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
