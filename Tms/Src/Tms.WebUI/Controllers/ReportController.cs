
using System;
using System.Text;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
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
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
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

        [Route("Excel")]
        public void ExportListFromTsv([FromQuery]string from, [FromQuery]string to)
        {
            var dateFrom = DateTime.ParseExact(from, "yyyy-MM",
                                               System.Globalization.CultureInfo.InvariantCulture);
            var dateTo = DateTime.ParseExact(to, "yyyy-MM",
                                             System.Globalization.CultureInfo.InvariantCulture);
            var fileName = string.Format(@"TMSreport from {0} to {1}.xls", from, to);

            Response.Clear();
            Response.Headers[HeaderNames.ContentDisposition] = "attachment;filename="+fileName;
            Response.Headers[HeaderNames.ContentType] =  "application/vnd.ms-excel";
            Response.WriteAsync(_reportService.GetTabularReport(dateFrom, dateTo), Encoding.GetEncoding(1251));
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
