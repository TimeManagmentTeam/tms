
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Text;
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
            var context = HttpContext;
            var response = context.Response;
            var dateFrom = DateTime.ParseExact(from, "yyyy-MM",
                                               System.Globalization.CultureInfo.InvariantCulture);
            var dateTo = DateTime.ParseExact(to, "yyyy-MM",
                                             System.Globalization.CultureInfo.InvariantCulture);
            var fileName = string.Format(@"TMSreport from {0} to {1}.xls", from, to);

            response.Clear();
            response.Headers[HeaderNames.ContentDisposition] = "attachment;filename="+fileName;
            response.Headers[HeaderNames.ContentType] =  "application/vnd.ms-excel";
            WriteTsv(_reportService.GetListReport(dateFrom, dateTo), response);
        }



        private void WriteTsv<T>(IEnumerable<T> data, HttpResponse response)
        {
            var props = TypeDescriptor.GetProperties(typeof(T));
            foreach (PropertyDescriptor prop in props)
            {
                response.WriteAsync("test"); // header
                //response.WriteAsync(prop.DisplayName); // header
                response.WriteAsync("\t");
            }
            response.WriteAsync("\r\n");
            foreach (var item in data)
            {
                foreach (PropertyDescriptor prop in props)
                {
                    if (prop.Converter != null)
                    {
                        response.WriteAsync(
                            prop.Converter.ConvertToString(
                                prop.GetValue(item)));
                    }
                    response.WriteAsync("\t");
                }
                response.WriteAsync("\r\n");
            }
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
