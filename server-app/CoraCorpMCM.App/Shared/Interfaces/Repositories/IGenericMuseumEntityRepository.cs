using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CoraCorpMCM.App.Shared.Interfaces.Entities;

namespace CoraCorpMCM.App.Shared.Interfaces.Repositories
{
  public interface IGenericMuseumEntityRepository<T, TId> where T : class, IMuseumEntity<TId>
  {
    Task<IEnumerable<T>> GetAllAsync(Guid museumId);
    Task<T> GetAsync(TId id, Guid museumId);
    void Add(T entity, Guid museumId);
    Task<T> UpdateAsync(T entity, Guid museumId);
    Task DeleteAsync(TId id, Guid museumId);
  }
}
