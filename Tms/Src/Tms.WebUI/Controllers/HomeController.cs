using Microsoft.AspNetCore.Mvc;

namespace Tms.WebUI.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
