using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Tms.Services.EmployeesService;
using Excel = Microsoft.Office.Interop.Excel;

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

        public byte[] ToExcel()
        {
            //var excelApp = new Excel.Application();
            //var workbook = excelApp.Workbooks.Add();
            //Excel._Worksheet workSheet = (Excel.Worksheet)excelApp.ActiveSheet;
            //workSheet.Cells[1, "A"] = "ID Number";
            //workSheet.Cells[1, "B"] = "Current Balance";
            //((Excel.Range)workSheet.Columns[1]).AutoFit();
            //((Excel.Range)workSheet.Columns[2]).AutoFit();
            //workbook.;
            return null;
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