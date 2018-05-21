using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
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

        public string ToTabularString()
        {
            var result = new StringBuilder();
            foreach (var month in _report)
            {
                result.AppendLine(month.Month.ToString("MMMM yyyy", CultureInfo.CreateSpecificCulture("ru-RU")));
                foreach (var workedTime in month.WorkedTime)
                {
                    var employee = workedTime.Key;
                    result.Append( employee.FirstName + " " + employee.MiddleName + " " + employee.LastName + "\t");
                    result.Append(workedTime.Value);
                    result.AppendLine();
                }
                result.AppendLine();
            }
            return result.ToString();
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