using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Songbook.DataAccess;

var host = Host.CreateApplicationBuilder(args);
var services = host.Services;
var configuration = host.Configuration;
configuration.AddJsonFile("appsettings.json");

services.AddDbContext<SongbookContext>(options => {
    var connectionString = configuration.GetConnectionString("Default");
    var assemblyName = typeof(Program).Assembly.GetName().FullName;
    options.UseNpgsql(connectionString, b => b.MigrationsAssembly(assemblyName));

});

await host.Build().RunAsync();