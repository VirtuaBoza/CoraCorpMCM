namespace CoraCorpMCM.App.Interfaces.Entities
{
  public interface IIdentifiable<T>
  {
    T Id { get; set; }
  }
}