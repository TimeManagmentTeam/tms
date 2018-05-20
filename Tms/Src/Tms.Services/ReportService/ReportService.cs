using System;
using System.Collections.Generic;

namespace Tms.Services.ReportService
{
    public class ReportService
    {
        private readonly ReportBuilder _reportBuilder;

        public ReportService(ReportBuilder reportBuilder)
        {
            _reportBuilder = reportBuilder;
        }

        public List<Report.ReportMonth> GetListReport(DateTime from, DateTime to)
        {
            return _reportBuilder.ForInterval(from,to).Build().ToList();
        }

        public List<Report.ReportMonth> GetListReport(Guid directorsId, DateTime from, DateTime to)
        {
            return _reportBuilder.ForDirector(directorsId).ForInterval(from, to).Build().ToList();
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
