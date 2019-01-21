using System.Linq;
using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Entities;
using CoraCorpMCM.App.Account.Interfaces.Repositories;
using CoraCorpMCM.App.Account.Interfaces.Services;
using CoraCorpMCM.App.Account.Services.Models;
using CoraCorpMCM.App.Shared.Entities;
using CoraCorpMCM.App.Shared.Services.Models;
using Microsoft.AspNetCore.Identity;

namespace CoraCorpMCM.App.Account.Services
{
  public class MuseumRegistrationService : IMuseumRegistrationService
  {
    private readonly IMuseumRepository museumRepository;
    private readonly UserManager<ApplicationUser> userManager;

    public MuseumRegistrationService(
      IMuseumRepository museumRepository,
      UserManager<ApplicationUser> userManager)
    {
      this.museumRepository = museumRepository;
      this.userManager = userManager;
    }

    public async Task<ServiceResult> RegisterMuseumAsync(MuseumRegistrationModel model)
    {
      var museum = new Museum
      {
        Name = model.MuseumName,
      };

      await museumRepository.CreateAsync(museum);

      var user = new ApplicationUser
      {
        UserName = model.Username,
        Email = model.Email,
        Museum = museum,
      };

      var identityResult = await userManager.CreateAsync(user, model.Password);
      if (identityResult.Succeeded)
      {
        return ServiceResult.Success;
      }

      var serviceErrors = identityResult.Errors.Select(error => new ServiceError { Code = error.Code, Description = error.Description });
      return ServiceResult.Failed(serviceErrors.ToArray());
    }
  }
}
