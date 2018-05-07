using System;

namespace Tms.Services.ReportService
{
    public class ReportService
    {
        private readonly ReportBuilder _reportBuilder;

        public ReportService(ReportBuilder reportBuilder)
        {
            _reportBuilder = reportBuilder;
        }

        public byte[] GetExcelReport(DateTime from, DateTime to)
        {
            return _reportBuilder.ForInterval(from,to).Build().ToExcel();
        }

        public byte[] GetExcelReport(Guid directorsId, DateTime from, DateTime to)
        {
            return _reportBuilder.ForDirector(directorsId).ForInterval(from, to).Build().ToExcel();
        }

        public string GetJsonReport(DateTime from, DateTime to)
        {
            return _reportBuilder.ForInterval(from, to).Build().ToJson();
        }

        public string GetJsonReport()
        {
            return _reportBuilder.Build().ToJson();
        }
    }
}
