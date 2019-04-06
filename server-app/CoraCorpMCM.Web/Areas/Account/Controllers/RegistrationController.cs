using System;
using System.Linq;
using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Entities;
using CoraCorpMCM.App.Account.Interfaces.Services;
using CoraCorpMCM.App.Account.Services.Models;
using CoraCorpMCM.Web.Areas.Account.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CoraCorpMCM.Web.Areas.Account.Controllers
{
  [Area("Account")]
  [ApiController]
  public class RegistrationController : ControllerBase
  {
    private readonly IMuseumRegistrationService museumRegistrationService;
    private readonly IEmailConfirmationService emailConfirmationService;
    private readonly UserManager<ApplicationUser> userManager;
    private readonly IIdentityTokenService identityTokenService;

    public RegistrationController(
      IMuseumRegistrationService museumRegistrationService,
      IEmailConfirmationService emailConfirmationService,
      UserManager<ApplicationUser> userManager,
      IIdentityTokenService identityTokenService)
    {
      this.emailConfirmationService = emailConfirmationService;
      this.userManager = userManager;
      this.identityTokenService = identityTokenService;
      this.museumRegistrationService = museumRegistrationService;
    }

    [HttpPost]
    [Route("api/[area]/[controller]")]
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
      if (result.Succeeded)
      {
        var user = await userManager.FindByEmailAsync(model.Email);
        var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
        var callbackUrl = Url.Action(
          "ConfirmEmail",
          "Registration",
          new { userId = user.Id, code = code },
          Request.Scheme);
        await emailConfirmationService.SendConfirmationEmailAsync(user, callbackUrl);
        return Ok();
      };
      return BadRequest(result);
    }

    [Route("[area]/[controller]/[action]")]
    public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string code)
    {
      if (userId == null || code == null)
      {
        return Redirect("/");
      }

      var user = await userManager.FindByIdAsync(userId);
      if (user == null)
      {
        return NotFound($"Unable to load user with ID '{userId}'.");
      }

      var result = await userManager.ConfirmEmailAsync(user, code);
      if (!result.Succeeded)
      {
        throw new InvalidOperationException($"Error confirming email for user with ID '{userId}':");
      }

      var token = await identityTokenService.CreateTokenAsync(user);

      return Redirect($"/emailConfirmed?t={token}");
    }
  }
}
