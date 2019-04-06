using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoraCorpMCM.App.Shared.Interfaces.Entities;
using CoraCorpMCM.App.Shared.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CoraCorpMCM.Data.Repositories
{
  public class GenericMuseumEntityRepository<T, TId> : IGenericMuseumEntityRepository<T, TId> where T : class, IMuseumEntity<TId>
  {
    private readonly ApplicationDbContext context;

    public GenericMuseumEntityRepository(ApplicationDbContext context)
    {
      this.context = context;
    }

    public void Add(T entity)
    {
      context.Set<T>().Add(entity);
    }

    public async Task<IEnumerable<T>> GetAllAsync(Guid museumId)
    {
      return await context.Set<T>().Where(x => x.MuseumId == museumId).ToListAsync();
    }

    public async Task<T> GetAsync(TId id)
    {
      return await context.Set<T>().FindAsync(id);
    }
  }
}
