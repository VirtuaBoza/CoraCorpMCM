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
      var storedEntity = await GetAsync(entity.Id, museumId);
      if (storedEntity == null 
        || storedEntity.MuseumId != museumId
        || entity.ConcurrencyStamp != storedEntity.ConcurrencyStamp)
      {
        throw new Exception();
      }

      entity.MuseumId = museumId;
      entity.ConcurrencyStamp = Guid.NewGuid().ToString();
      context.Items.Update(entity);
      return entity;
    }
  }
}
