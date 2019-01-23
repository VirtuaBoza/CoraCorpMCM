using System.Threading.Tasks;
using CoraCorpMCM.App.Shared.Interfaces.Entities;
using CoraCorpMCM.App.Shared.Interfaces.Repositories;

namespace CoraCorpMCM.Data.Repositories
{
  public class GenericEntityRepository<T, TId> : IGenericEntityRepository<T, TId> where T : class, IEntity<TId>
  {
    private readonly ApplicationDbContext context;

    public GenericEntityRepository(ApplicationDbContext context)
    {
      this.context = context;
    }

    public async Task<T> CreateAsync(T entity)
    {
      context.Add(entity);
      await context.SaveChangesAsync();
      return entity;
    }

    public async Task<T> GetByIdAsync(TId id)
    {
      return await context.Set<T>().FindAsync(id);
    }
  }
}
