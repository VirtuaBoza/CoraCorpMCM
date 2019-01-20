using System;

namespace CoraCorpMCM.App.Shared.Interfaces.Entities
{
  public interface IMuseumEntity<TId> : IEntity<TId>
  {
    Guid MuseumId { get; set; }
  }
}
