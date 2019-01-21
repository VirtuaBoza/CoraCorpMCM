using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Entities;

namespace CoraCorpMCM.App.Account.Interfaces.Services
{
  public interface IEmailConfirmationService
  {
    Task SendConfirmationEmailAsync(ApplicationUser user, string callbackRoute);
  }
}
