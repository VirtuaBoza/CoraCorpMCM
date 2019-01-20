using System;
using CoraCorpMCM.App.Collection.Entities;
using CoraCorpMCM.App.Collection.Interfaces.Repositories;

namespace CoraCorpMCM.Data.Repositories
{
  public class ItemRepository : GenericMuseumEntityRepository<Item, Guid>, IItemRepository
  {
    public ItemRepository(ApplicationDbContext context) : base(context) { }
  }
}
