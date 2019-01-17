using System;
using CoraCorpMCM.App.Entities;

namespace CoraCorpMCM.Data.Repositories
{
    public class ItemRepository : MuseumEntityRepository<Item, Guid>
    {
        public ItemRepository (ApplicationContext context) : base (context) { }
    }
}