
using System;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Tms.Services.ReportService;

namespace Tms.WebUI.Controllers
{
    [Route("dev/Report")]
    public class ReportController : Controller
    {
        private readonly ReportService _reportService;
        public ReportController(ReportService reportService)
        {
            _reportService = reportService;
        }

        [Route("ForDates")]
        public FileResult ForDates([FromQuery]string from, [FromQuery]string to)
        {
            var dateFrom = DateTime.ParseExact(from, "yyyy-MM",
                                      System.Globalization.CultureInfo.InvariantCulture);
            var dateTo = DateTime.ParseExact(to, "yyyy-MM",
                                               System.Globalization.CultureInfo.InvariantCulture);
            var report = Encoding.UTF8.GetBytes(_reportService.GetJsonReport(dateFrom, dateTo));
            var fileType = "text/plain";
            var fileName = string.Format(@"TMSreport from {0} to {1}.txt", from, to);
            return File(report, fileType, fileName);
        }

        public FileResult Get()
        {
            var report = Encoding.UTF8.GetBytes(_reportService.GetJsonReport());
            var fileType = "text/plain";
            var fileName = string.Format(@"TMSreport at {0}.txt",DateTime.Today.ToString("yyyy.MM.dd"));
            return File(report, fileType, fileName);
        }
    }
}
