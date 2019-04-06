using System;
using CoraCorpMCM.App.Account.Interfaces.Repositories;
using CoraCorpMCM.App.Shared.Entities;

namespace CoraCorpMCM.Data.Repositories
{
  public class MuseumRepository : GenericEntityRepository<Museum, Guid>, IMuseumRepository
  {
    public MuseumRepository(ApplicationDbContext context) : base(context) { }
  }
}
