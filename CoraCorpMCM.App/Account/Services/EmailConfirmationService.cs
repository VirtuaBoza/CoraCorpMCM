using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Entities;
using CoraCorpMCM.App.Account.Interfaces.Services;

namespace CoraCorpMCM.App.Account.Services
{
  public class EmailConfirmationService : IEmailConfirmationService
  {
    public Task SendConfirmationEmailAsync(ApplicationUser user, string callbackRoute)
    {
      throw new System.NotImplementedException();
    }
  }
}
