using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Entities;
using CoraCorpMCM.App.Account.Interfaces.Repositories;
using CoraCorpMCM.App.Account.Interfaces.Services;
using CoraCorpMCM.App.Account.Services.Models;
using CoraCorpMCM.App.Shared.Entities;
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

    public async Task<IdentityResult> RegisterMuseumAsync(MuseumRegistrationModel model)
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

      return await userManager.CreateAsync(user, model.Password);
    }
  }
}
