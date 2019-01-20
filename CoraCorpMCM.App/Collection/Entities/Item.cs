using System;
using CoraCorpMCM.App.Shared.Entities;
using CoraCorpMCM.App.Shared.Interfaces.Entities;

namespace CoraCorpMCM.App.Collection.Entities
{
  public class Item : IMuseumEntity<Guid>
  {
    public Guid Id { get; set; }
    public Guid MuseumId { get; set; }
    public Museum Museum { get; set; }
  }
}
