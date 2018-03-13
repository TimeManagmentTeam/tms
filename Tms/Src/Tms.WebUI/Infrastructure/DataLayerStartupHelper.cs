using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tms.DataLayer;
using Tms.DataLayer.Repositories;
using Tms.DataLayer.Repositories.Interfaces;

namespace Tms.WebUI.Infrastructure
{
    public static class DataLayerStartupHelper
    {
        public static IServiceCollection WithDataLayerServices(this IServiceCollection @this, IConfiguration configuration)
        {
            return @this
                .AddScoped(provider => TmsContextFactory.GetTestContext())
                .AddScoped<IRepositoryManager, RepositoryManager>();
        }
    }
}
