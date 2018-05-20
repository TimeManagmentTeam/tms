using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Tms.Services.EmployeesService;

namespace Tms.Services.ReportService
{
    public class Report
    {
        private readonly List<ReportMonth> _report = new List<ReportMonth>();

        public void AddMonth(ReportMonth reportMonth) => _report.Add(reportMonth);

        public string ToJson()
        {
            return JsonConvert.SerializeObject(_report, Formatting.Indented);
        }

        public List<ReportMonth> ToList()
        {
            return _report;
        }

        public class ReportMonth
        {
            public DateTime Month;

            public Dictionary<DtoEmployee,int> WorkedTime = new Dictionary<DtoEmployee, int>();

            public ReportMonth(DateTime month)
            {
                Month = month;
            }

            public void AddWorkedTime(DtoEmployee employee, int workedTime) => WorkedTime.Add(employee, workedTime);
        }
    }
}