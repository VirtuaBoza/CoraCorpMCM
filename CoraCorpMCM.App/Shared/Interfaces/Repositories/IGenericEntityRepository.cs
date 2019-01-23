using System.Threading.Tasks;
using CoraCorpMCM.App.Shared.Interfaces.Entities;

namespace CoraCorpMCM.App.Shared.Interfaces.Repositories
{
  public interface IGenericEntityRepository<T, TId> where T : class, IEntity<TId>
  {
    Task<T> CreateAsync(T entity);
    Task<T> GetByIdAsync(TId id);
  }
}
