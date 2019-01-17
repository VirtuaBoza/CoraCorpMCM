using System;
using CoraCorpMCM.App.Entities;

namespace CoraCorpMCM.App.Interfaces.Repositories
{
    public interface IItemRepository : IMuseumEntityRepository<Item, Guid> { }
}