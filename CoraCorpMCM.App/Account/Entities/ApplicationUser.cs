using System;
using CoraCorpMCM.App.Shared.Entities;
using Microsoft.AspNetCore.Identity;

namespace CoraCorpMCM.App.Account.Entities
{
  public class ApplicationUser : IdentityUser
  {
    public Guid MuseumId { get; set; }
    public Museum Museum { get; set; }
  }
}
