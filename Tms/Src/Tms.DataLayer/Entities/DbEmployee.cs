using System;
using System.Collections.Generic;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.Entities
{
    public class DbEmployee : IDbEntity
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MidlleName { get; set; }
        public int Role { get; set; }
        public string PassHash { get; set; }

        public ICollection<DbTimeStamp> TimeStamps { get; set; }

        public DbEmployee()
        {
            TimeStamps = new List<DbTimeStamp>();
        }
    }
}
