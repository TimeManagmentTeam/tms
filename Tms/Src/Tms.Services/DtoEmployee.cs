using System;

namespace Tms.Services
{
    public class DtoEmployee
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MidlleName { get; set; }
        public string Role { get; set; }
        public string PassHash { get; set; }

        public static class TmsRole
        {
            public const string Admin = "Admin";
            public const string Employee = "DtoEmployee";
        }
    }
}
