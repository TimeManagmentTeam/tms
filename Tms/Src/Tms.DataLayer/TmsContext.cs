using Microsoft.EntityFrameworkCore;
using Tms.DataLayer.Entities;

namespace Tms.DataLayer
{
    internal class TmsContext : DbContext
    {
        public TmsContext() { }
        public TmsContext(DbContextOptions<TmsContext> options) : base(options) { }

        public DbSet<DbTest> TestEntities { get; set; }
    }

    internal static class TmsContextFactory
    {
        public static TmsContext GetTestContext()
        {
            var options = new DbContextOptionsBuilder<TmsContext>()
                .UseInMemoryDatabase(databaseName: "Test")
                .Options;
            var context = new TmsContext(options);
            return context;
        }
    }
}
