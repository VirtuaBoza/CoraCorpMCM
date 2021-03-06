﻿using System;
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
    protected readonly ApplicationDbContext context;

    public GenericMuseumEntityRepository(ApplicationDbContext context)
    {
      this.context = context;
    }

    public void Add(T entity, Guid museumId)
    {
      entity.MuseumId = museumId;
      context.Set<T>().Add(entity);
    }

    public async Task DeleteAsync(TId id, Guid museumId)
    {
      var storedEntity = await GetAsync(id, museumId);
      if (storedEntity == null || storedEntity.MuseumId != museumId)
      {
        throw new Exception();
      }

      context.Set<T>().Remove(storedEntity);
    }

    public async Task<IEnumerable<T>> GetAllAsync(Guid museumId)
    {
      return await context.Set<T>()
        .Where(x => x.MuseumId == museumId)
        .AsNoTracking()
        .ToListAsync();
    }

    public async Task<T> GetAsync(TId id, Guid museumId)
    {
      return await context.Set<T>()
        .Where(x => x.MuseumId == museumId)
        .AsNoTracking()
        .SingleOrDefaultAsync(entity => entity.Id.Equals(id));
    }

    public async virtual Task<T> UpdateAsync(T entity, Guid museumId)
    {
      var storedEntity = await GetAsync(entity.Id, museumId);
      if (storedEntity == null || storedEntity.MuseumId != museumId)
      {
        throw new Exception();
      }

      entity.MuseumId = museumId;
      context.Set<T>().Update(entity);
      return entity;
    }
  }
}
