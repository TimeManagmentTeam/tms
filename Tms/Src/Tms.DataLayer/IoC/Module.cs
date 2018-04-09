using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tms.DataLayer.Repositories;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.IoC
{
    public static class Module
    {
        public static IServiceCollection WithDataLayer(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("PgSqlServer");

            return serviceCollection

                .AddScoped(provider => TmsContextFactory.GetContext(connectionString))

                .AddScoped<IRepositoryManager, RepositoryManager>();
        }
    }
}
