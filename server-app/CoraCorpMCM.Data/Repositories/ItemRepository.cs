using System;
using System.Threading.Tasks;
using CoraCorpMCM.App.Collection.Entities;
using CoraCorpMCM.App.Collection.Interfaces.Repositories;

namespace CoraCorpMCM.Data.Repositories
{
  public class ItemRepository : GenericMuseumEntityRepository<Item, Guid>, IItemRepository
  {
    public ItemRepository(ApplicationDbContext context) : base(context) { }

    public async override Task<Item> UpdateAsync(Item entity, Guid museumId)
    {
      await base.UpdateAsync(entity, museumId);
      entity.ConcurrencyStamp = Guid.NewGuid().ToString();
      return entity;
    }
  }
}
