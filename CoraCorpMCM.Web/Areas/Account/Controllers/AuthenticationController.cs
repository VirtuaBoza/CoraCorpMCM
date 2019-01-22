using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Entities;
using CoraCorpMCM.App.Account.Interfaces.Services;
using CoraCorpMCM.Web.Areas.Account.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CoraCorpMCM.Web.Areas.Account.Controllers
{
  [Area("Account")]
  [Route("api/[area]/[controller]")]
  [ApiController]
  public class AuthenticationController : ControllerBase
  {
    private readonly UserManager<ApplicationUser> userManager;
    private readonly IPasswordHasher<ApplicationUser> passwordHasher;
    private readonly IIdentityTokenService identityTokenService;

    public AuthenticationController(
      UserManager<ApplicationUser> userManager,
      IPasswordHasher<ApplicationUser> passwordHasher,
      IIdentityTokenService identityTokenService)
    {
      this.userManager = userManager;
      this.passwordHasher = passwordHasher;
      this.identityTokenService = identityTokenService;
    }

    [HttpPost]
    public async Task<IActionResult> Token([FromBody] CredentialViewModel model)
    {
      var user = await userManager.FindByEmailAsync(model.Email);
      if (user == null || !user.EmailConfirmed) return BadRequest();

      var passwordVerificationResult = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, model.Password);
      if (passwordVerificationResult != PasswordVerificationResult.Success)
      {
        return BadRequest();
      }

      var token = await identityTokenService.CreateTokenAsync(user);
      return Ok(new { token });
    }
  }
}
