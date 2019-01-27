using System;
using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Entities;
using CoraCorpMCM.App.Collection.Entities;
using CoraCorpMCM.App.Shared.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CoraCorpMCM.Data
{
  public class DbInitializer
  {
    const string DIRECTOR = "Director";
    const string ADMINISTRATOR = "Administrator";
    const string CONTRIBUTOR = "Contributor";

    private readonly ApplicationDbContext context;
    private readonly UserManager<ApplicationUser> userManager;
    private readonly RoleManager<IdentityRole> roleManager;

    public DbInitializer(
      ApplicationDbContext context,
      UserManager<ApplicationUser> userManager,
      RoleManager<IdentityRole> roleManager)
    {
      this.userManager = userManager;
      this.roleManager = roleManager;
      this.context = context;
    }

    public async Task Initialize()
    {
      var rolesExist = await roleManager.Roles.AnyAsync();
      if (!rolesExist)
      {
        await CreateRoles();
      }
    }

    private async Task CreateRoles()
    {

      var directorRole = new IdentityRole(DIRECTOR);
      await roleManager.CreateAsync(directorRole);

      var administratorRole = new IdentityRole(ADMINISTRATOR);
      await roleManager.CreateAsync(administratorRole);

      var contributorRole = new IdentityRole(CONTRIBUTOR);
      await roleManager.CreateAsync(contributorRole);
    }

    public async Task Seed()
    {
      var museumsExist = await context.Museums.AnyAsync();
      if (!museumsExist)
      {
        var museum = CreateSampleMuseum();
        CreateSampleItems(museum);
        await CreateSampleUsers(museum);
      }
    }

    private Museum CreateSampleMuseum()
    {
      var museum = new Museum
      {
        Name = "Sample Museum",
      };

      context.Museums.Add(museum);
      return museum;
    }

    private void CreateSampleItems(Museum museum)
    {
      for (var i = 0; i < 10; i++)
      {
        var item = new Item
        {
          Museum = museum,
          Title = $"Item {i} Title",
        };
        context.Items.Add(item);
      }
    }

    private async Task CreateSampleUsers(Museum museum)
    {
      await CreateSampleUser("Madam", "Director", museum, DIRECTOR);
      await CreateSampleUser("Mister", "Administrator", museum, ADMINISTRATOR);
      await CreateSampleUser("Guy", "Contributor", museum, CONTRIBUTOR);
      await CreateSampleUser("Justa", "Member", museum);
    }

    private async Task CreateSampleUser(
      string firstName,
      string lastName,
      Museum museum,
      string role = null)
    {
      var user = new ApplicationUser
      {
      UserName = $"{firstName} {lastName}",
      Email = $"{firstName}.{lastName}@museum.com",
      EmailConfirmed = true,
      Museum = museum,
      };

      var userResult = await userManager.CreateAsync(user, "password");
      if (!userResult.Succeeded)
      {
        throw new InvalidOperationException($"Failed to build user {firstName} {lastName}.");
      }

      if (role != null)
      {
        var roleResult = await userManager.AddToRoleAsync(user, role);
        if (!roleResult.Succeeded)
        {
          throw new InvalidOperationException($"Failed to add user {firstName} {lastName} to role {role}.");
        }
      }
    }
  }
}
