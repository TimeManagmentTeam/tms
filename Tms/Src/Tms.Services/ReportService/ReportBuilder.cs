using System;
using System.Collections.Generic;
using System.Linq;
using Tms.Services.EmployeesService;

namespace Tms.Services.ReportService
{
    public class ReportBuilder
    {
        private readonly EmployeesService.EmployeesService _employeesService;
        private readonly TimeStampsService.TimeStampsService _timeStampsService;

        private ICollection<DtoEmployee> _employees;
        private DateTime _from = new DateTime(2018,01,01);
        private DateTime _to = DateTime.Today;

        public ReportBuilder(EmployeesService.EmployeesService employeesService, TimeStampsService.TimeStampsService timeStampsService)
        {
            _employeesService = employeesService;
            _timeStampsService = timeStampsService;
            _employees = _employeesService.GetAll();
        }

        public ReportBuilder ForInterval(DateTime from, DateTime to)
        {
            _from = from;
            _to = to;
            return this;
        }

        public ReportBuilder ForDirector(Guid directorsId)
        {
            _employees = _employeesService.GetSubordinates(directorsId);
            return this;
        }

        private List<DateTime> GetAllMonths(DateTime from, DateTime to)
        {
            var months = new List<DateTime>();

            for (var year = from.Year; year <= to.Year; year++)
            {
                for (var month = 1; month <= 12; month++)
                {
                    months.Add(new DateTime(year,month,1));
                    if (year==to.Year&&month==to.Month)
                    {
                        return months;
                    }
                }
            }
            return months;
        }

        public Report Build()
        {
            var report = new Report();
            foreach (var month in GetAllMonths(_from,_to))
            {
                var reportMonth = new Report.ReportMonth(month);
                foreach (var employee in _employees)
                {
                    var workedTime = _timeStampsService.Read(employee.Id, month, month.AddMonths(1))
                        .Select(e => e.WorkedTime)
                        .Select(t => t.TotalMinutes)
                        .Select(t => Math.Round(t))
                        .Select(t => Convert.ToInt32(t))
                        .Sum(t => t);
                    reportMonth.AddWorkedTime(employee,workedTime);
                }
                report.AddMonth(reportMonth);
            }
            return report;
        }
    }
}