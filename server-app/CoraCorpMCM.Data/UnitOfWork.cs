using System.Threading.Tasks;
using CoraCorpMCM.App.Shared.Interfaces;

namespace CoraCorpMCM.Data
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly ApplicationDbContext context;

    public UnitOfWork(ApplicationDbContext context)
    {
      this.context = context;
    }

    public async Task SaveChangesAsync()
    {
      await context.SaveChangesAsync();
    }
  }
}