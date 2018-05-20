using System;
using System.ComponentModel.DataAnnotations.Schema;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.Entities
{
    public class DbTimeStamp : IDbEntity
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan WorkedTime { get; set; }

        public Guid DbEmployeeId { get; set; }

        [ForeignKey("DbEmployeeId")]
        public DbEmployee DbEmployee { get; set; }
    }
}
