using System;
using Tms.DataLayer.Entities;

namespace Tms.Services
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MidlleName { get; set; }
        public string Role { get; set; }
        public string PassHash { get; set; }

        public static Employee FromDbEmployee(DbEmployee dbEmployee)
        {
            return new Employee
            {
                Id = dbEmployee.Id,
                FirstName = dbEmployee.FirstName,
                LastName = dbEmployee.LastName,
                MidlleName = dbEmployee.MidlleName,
                Role = dbEmployee.Role,
                PassHash = dbEmployee.PassHash
            };
        }

        public DbEmployee ToDbEmployee()
        {
            return new DbEmployee
            {
                Id = Id,
                FirstName = FirstName,
                LastName = LastName,
                MidlleName = MidlleName,
                Role = Role,
                PassHash = PassHash
            };
        }

        public static class TmsRole
        {
            public const string Admin = "Admin";
            public const string Employee = "Employee";
        }
    }
}
