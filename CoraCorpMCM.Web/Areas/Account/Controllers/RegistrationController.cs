using System.Linq;
using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Interfaces.Services;
using CoraCorpMCM.App.Account.Services.Models;
using CoraCorpMCM.Web.Areas.Account.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CoraCorpMCM.Web.Areas.Account.Controllers
{
  [Area("Account")]
  [Route("api/[area]/[controller]")]
  [ApiController]
  public class RegistrationController : ControllerBase
  {
    private readonly IMuseumRegistrationService museumRegistrationService;
    private readonly IEmailConfirmationService emailConfirmationService;

    public RegistrationController(
      IMuseumRegistrationService museumRegistrationService)
    {
      this.museumRegistrationService = museumRegistrationService;
    }

    [HttpPost]
    public async Task<IActionResult> RegisterMuseum(RegistrationViewModel model)
    {
      var registrationModel = new MuseumRegistrationModel
      {
        Email = model.Email,
        MuseumName = model.MuseumName,
        Password = model.Password,
        Username = model.Username,
      };
      var result = await museumRegistrationService.RegisterMuseumAsync(registrationModel);
      if (result.Succeeded) return Ok();
      return BadRequest(result);
    }
  }
}
