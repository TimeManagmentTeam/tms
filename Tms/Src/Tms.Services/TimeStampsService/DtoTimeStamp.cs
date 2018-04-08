using System;
using Tms.DataLayer.Entities;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.Services.TimeStampsService
{
    public class DtoTimeStamp : IDbEntity
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public DateTime WorkedTime { get; set; }

        public Guid DbEmployeeId { get; set; }
        public DbEmployee DbEmployee { get; set; }
    }
}
