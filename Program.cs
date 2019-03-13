using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using forms.Database;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;

namespace forms
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var host = CreateWebHostBuilder(args).Build();

			InitDb(host);

			host.Run();
		}

		private static void InitDb(IWebHost host)
		{
			using (var scope = host.Services.CreateScope())
			{
				var services = scope.ServiceProvider;

				try
				{
					var db = services.GetRequiredService<FormsDbContext>();
					db.Database.Migrate();
				}
				catch (Exception ex)
				{
					var logger = services.GetRequiredService<ILogger<Program>>();
					logger.LogError(ex, "An error occurred while migrating the database.");
				}
			}
		}

		public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseUrls("http://*:5006")
				.UseStartup<Startup>()
				.UseSerilog()
				.ConfigureLogging((context, _) =>
					Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(context.Configuration).CreateLogger()
				);
	}
}
