using System;
using CoraCorpMCM.App.Shared.Entities;
using CoraCorpMCM.App.Shared.Interfaces.Repositories;

namespace CoraCorpMCM.App.Account.Interfaces.Repositories
{
  public interface IMuseumRepository : IGenericEntityRepository<Museum, Guid> { }
}
