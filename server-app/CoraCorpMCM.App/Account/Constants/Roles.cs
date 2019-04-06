namespace CoraCorpMCM.App.Account.Constants
{
    public static class Roles
    {
      public const string DIRECTOR = "Director";
      public const string ADMINISTRATOR = "Administrator";
      public const string ADMINISTRATOR_AND_UP = "Administrator,Director";

      public const string CONTRIBUTOR = "Contributor";
      public const string CONTRIBUTOR_AND_UP = "Contributor,Administrator,Director";
    }
}