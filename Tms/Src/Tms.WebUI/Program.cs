using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Tms.WebUI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureAppConfiguration((builderContext, config) =>
                {
                    var configPath = Path.Combine(Directory.GetCurrentDirectory(), "../../config");
                    config
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                        .AddJsonFile(Path.Combine(configPath, "db-config.json"), optional: false, reloadOnChange: true);
                })
                .Build();
    }
}
