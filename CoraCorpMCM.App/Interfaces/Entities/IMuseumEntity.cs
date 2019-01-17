namespace CoraCorpMCM.App.Interfaces.Entities
{
  public interface IMuseumEntity<TId> : IIdentifiable<TId>
  {
    int MuseumId { get; set; }
  }
}
