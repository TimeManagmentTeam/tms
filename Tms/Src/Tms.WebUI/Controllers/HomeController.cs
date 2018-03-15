using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Tms.Services.Test.Interfaces;
using Tms.WebUI.Models;

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

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult TestAdd(string text)
        {
            var id = _testService.Add(text);
            return new ContentResult {Content = id.ToString(), StatusCode = 200};
        }

        [HttpGet]
        public IActionResult TestGetAll()
        {
            var entities = _testService.GetAll();
            return Json(entities);
        }
    }
}
