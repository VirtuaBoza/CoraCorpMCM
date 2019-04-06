using System;
using CoraCorpMCM.App.Shared.Interfaces.Entities;

namespace CoraCorpMCM.App.Shared.Entities
{
  public class Museum : IEntity<Guid>
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
  }
}
