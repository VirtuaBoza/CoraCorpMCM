using System;
using CoraCorpMCM.App.Collection.Entities;
using CoraCorpMCM.App.Shared.Interfaces.Repositories;

namespace CoraCorpMCM.App.Collection.Interfaces.Repositories
{
  public interface IItemRepository : IGenericMuseumEntityRepository<Item, Guid> { }
}
