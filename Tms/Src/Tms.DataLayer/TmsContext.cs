using Microsoft.EntityFrameworkCore;
using Tms.DataLayer.Entities;

namespace Tms.DataLayer
{
    internal class TmsContext : DbContext
    {
        public TmsContext(DbContextOptions<TmsContext> options) : base(options) { }

        public DbSet<DbEmployee> EmployeeEntities { get; set; }

        public DbSet<DbTimeStamp> TimeStampsEntities { get; set; }
    }
}
