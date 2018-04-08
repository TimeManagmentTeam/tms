using Microsoft.EntityFrameworkCore;
using Tms.DataLayer.Entities;

namespace Tms.DataLayer
{
    internal class TmsContext : DbContext
    {
        public TmsContext(DbContextOptions<TmsContext> options) : base(options) { }

        public DbSet<DbTest> TestEntities { get; set; }
    }
}
