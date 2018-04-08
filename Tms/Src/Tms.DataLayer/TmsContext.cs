using Microsoft.EntityFrameworkCore;
using Tms.DataLayer.Entities;

namespace Tms.DataLayer
{
    internal class TmsContext : DbContext
    {
        public TmsContext() { }
        public TmsContext(DbContextOptions<TmsContext> options) : base(options) { }

        public DbSet<DbEmployee> EmployeeEntities { get; set; }
    }

    internal static class TmsContextFactory
    {
        public static TmsContext GetEmployeeContext()
        {
            var options = new DbContextOptionsBuilder<TmsContext>()
                .UseInMemoryDatabase(databaseName: "Employee")
                .Options;
            var context = new TmsContext(options);
            return context;
        }
    }
}
