using Microsoft.Extensions.DependencyInjection;
using Tms.DataLayer.Repositories;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.DataLayer.IoC
{
    public static class Module
    {
        public static IServiceCollection WithDataLayer(this IServiceCollection serviceCollection)
        {
            return serviceCollection
                .AddScoped(provider => TmsContextFactory.GetEmployeeContext())
                .AddScoped<IRepositoryManager, RepositoryManager>();
        }
    }
}
