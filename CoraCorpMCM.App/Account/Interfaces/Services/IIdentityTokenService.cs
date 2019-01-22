using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Entities;

namespace CoraCorpMCM.App.Account.Interfaces.Services
{
  public interface IIdentityTokenService
  {
    Task<string> CreateTokenAsync(ApplicationUser user);
  }
}
