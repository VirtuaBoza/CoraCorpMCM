using CoraCorpMCM.App.Account.Entities;
using CoraCorpMCM.App.Collection.Entities;
using CoraCorpMCM.App.Shared.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CoraCorpMCM.Data
{
  public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Item> Items { get; set; }
    public DbSet<Museum> Museums { get; set; }
  }
}
