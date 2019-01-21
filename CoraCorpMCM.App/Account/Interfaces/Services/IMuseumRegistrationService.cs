using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Services.Models;
using CoraCorpMCM.App.Shared.Services.Models;

namespace CoraCorpMCM.App.Account.Interfaces.Services
{
  public interface IMuseumRegistrationService
  {
    Task<ServiceResult> RegisterMuseumAsync(MuseumRegistrationModel model);
  }
}
