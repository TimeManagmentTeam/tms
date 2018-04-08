using System;
using Tms.DataLayer.Enums;

namespace Tms.Services.EmployeesService
{
    public class DtoEmployee
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MidlleName { get; set; }
        public TmsRole Role { get; set; }
        public string PassHash { get; set; }
    }
}
