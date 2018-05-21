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

        public string GetTabularReport(DateTime from, DateTime to)
        {
            return _reportBuilder.ForInterval(from,to).Build().ToTabularString();
        }

        public string GetTabularReport(Guid directorsId, DateTime from, DateTime to)
        {
            return _reportBuilder.ForDirector(directorsId).ForInterval(from, to).Build().ToTabularString();
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
