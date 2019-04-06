using System.Text;
using CoraCorpMCM.App.Account.Entities;
using CoraCorpMCM.App.Account.Interfaces.Repositories;
using CoraCorpMCM.App.Account.Interfaces.Services;
using CoraCorpMCM.App.Account.Services;
using CoraCorpMCM.App.Collection.Interfaces.Repositories;
using CoraCorpMCM.App.Shared.Interfaces;
using CoraCorpMCM.App.Shared.Interfaces.Services;
using CoraCorpMCM.Data;
using CoraCorpMCM.Data.Repositories;
using CoraCorpMCM.Services.Email;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace CoraCorpMCM.Web
{
  public class Startup
  {
    public Startup(IConfiguration configuration, IHostingEnvironment environment)
    {
      Configuration = configuration;
      Environment = environment;
    }

    public IConfiguration Configuration { get; }
    public IHostingEnvironment Environment { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(
          Configuration.GetConnectionString("Default")));
      services.AddIdentity<ApplicationUser, IdentityRole>(options =>
        {
          options.Password.RequireDigit = false;
          options.Password.RequireLowercase = false;
          options.Password.RequireNonAlphanumeric = false;
          options.Password.RequireUppercase = false;
          options.Password.RequiredUniqueChars = 0;
          options.User.RequireUniqueEmail = true;
          options.User.AllowedUserNameCharacters = null;
        })
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

      services.AddAuthentication(options =>
        {
          options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
          if (Environment.IsDevelopment())
          {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
              ValidIssuer = Configuration["Tokens:Identity:Issuer"],
              ValidAudience = Configuration["Tokens:Identity:Audience"],
              ValidateIssuerSigningKey = true,
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Identity:Key"])),
              ValidateLifetime = true,
            };
          }
        });

      services.AddAuthorization(config =>
      {
        config.AddPolicy("EmailConfirmed", p => p.RequireClaim("email_verified", true.ToString()));
      });

      services.AddScoped<IUnitOfWork, UnitOfWork>();
      services.AddScoped<IItemRepository, ItemRepository>();
      services.AddScoped<IMuseumRepository, MuseumRepository>();
      services.AddScoped<IMuseumRegistrationService, MuseumRegistrationService>();
      services.AddScoped<IIdentityTokenService, IdentityTokenService>();
      services.AddTransient<IEmailConfirmationService, EmailConfirmationService>();
      services.AddSingleton<IEmailSender, EmailSender>();
      services.Configure<AuthMessageSenderOptions>(Configuration);

      services.AddTransient<DbInitializer>();

      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "../../client-app/build";
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, DbInitializer dbInitializer)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseStaticFiles();
      app.UseSpaStaticFiles();

      app.UseAuthentication();

      app.UseMvc(routes =>
      {
        routes.MapRoute(
          "confirmEmail",
          "Account/Registration/ConfirmEmail",
          defaults : new { area = "Account", controller = "Registration", action = "ConfirmEmail" });
      });

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "../../client-app";

        if (env.IsDevelopment())
        {
          spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
          // spa.UseReactDevelopmentServer(npmScript: "start");
        }
      });

      dbInitializer.Initialize().Wait();
      if (env.IsDevelopment())
      {
        dbInitializer.Seed().Wait();
      }
    }
  }
}
