using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Services.Models;
using Microsoft.AspNetCore.Identity;

namespace CoraCorpMCM.App.Account.Interfaces.Services
{
  public interface IMuseumRegistrationService
  {
    Task<IdentityResult> RegisterMuseumAsync(MuseumRegistrationModel model);
  }
}
