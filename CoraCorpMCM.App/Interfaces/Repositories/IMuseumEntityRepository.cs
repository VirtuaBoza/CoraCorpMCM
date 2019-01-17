using System.Collections.Generic;
using System.Threading.Tasks;
using CoraCorpMCM.App.Interfaces.Entities;

namespace CoraCorpMCM.App.Interfaces.Repositories
{
  public interface IMuseumEntityRepository<T, TId> where T : class, IMuseumEntity<TId>
  {
    Task<IEnumerable<T>> GetAllAsync(int museumId);
  }
}