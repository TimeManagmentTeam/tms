using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Tms.DataLayer
{
    internal class TmsContextFactory : IDesignTimeDbContextFactory<TmsContext>
    {
        public TmsContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TmsContext>();
            optionsBuilder.UseNpgsql("Server=localhost; Database=tms; User Id=postgres; Password=q1w2e3R$;");
            return new TmsContext(optionsBuilder.Options);
        }

        public static TmsContext GetContext(string connectionString)
        {
            var options = new DbContextOptionsBuilder<TmsContext>()
                .UseNpgsql(connectionString)
                .UseInMemoryDatabase(databaseName: "Employee")
                .Options;
            var context = new TmsContext(options);
            return context;
        }
    }
}
