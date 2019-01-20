using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Interfaces.Services;
using CoraCorpMCM.App.Account.Services.Models;
using CoraCorpMCM.Web.Areas.Account.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CoraCorpMCM.Web.Areas.Account.Controllers
{
  [Area("Account")]
  [Route("api/[area]/[controller]")]
  [ApiController]
  public class RegistrationController : ControllerBase
  {
    private readonly IMuseumRegistrationService museumRegistrationService;

    public RegistrationController(
      IMuseumRegistrationService museumRegistrationService)
    {
      this.museumRegistrationService = museumRegistrationService;
    }

    [HttpPost]
    public async Task<IActionResult> RegisterMuseum(MuseumRegistrationModel model)
    {
      var result = await museumRegistrationService.RegisterMuseumAsync(model);

      if (result.Succeeded)
      {
        return Ok();
      }

      return Ok(result.Errors);
    }
  }
}
