using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Entities;
using CoraCorpMCM.App.Account.Interfaces.Services;
using CoraCorpMCM.App.Shared.Interfaces.Services;
using CoraCorpMCM.Web.Areas.Account.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CoraCorpMCM.Web.Areas.Account.Controllers
{
  [Area("Account")]
  [ApiController]
  public class AuthenticationController : ControllerBase
  {
    private readonly UserManager<ApplicationUser> userManager;
    private readonly IPasswordHasher<ApplicationUser> passwordHasher;
    private readonly IIdentityTokenService identityTokenService;
    private readonly IEmailSender emailSender;

    public AuthenticationController(
      UserManager<ApplicationUser> userManager,
      IPasswordHasher<ApplicationUser> passwordHasher,
      IIdentityTokenService identityTokenService,
      IEmailSender emailSender)
    {
      this.userManager = userManager;
      this.passwordHasher = passwordHasher;
      this.identityTokenService = identityTokenService;
      this.emailSender = emailSender;
    }

    [HttpPost]
    [Route("api/[area]/[controller]/[action]")]
    public async Task<IActionResult> Login([FromBody] CredentialViewModel model)
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

    [HttpPost]
    [Route("api/[area]/[controller]/[action]")]
    public async Task<IActionResult> ForgotPassword([FromBody] string email)
    {
      var user = await userManager.FindByEmailAsync(email);
      if (user == null) return BadRequest("There is no account associated with this email address.");

      var resetToken = await userManager.GeneratePasswordResetTokenAsync(user);
      var callbackUrl = Url.Action(
        "ResetPassword",
        "Authentication",
        new { code = resetToken },
        Request.Scheme);

      await emailSender.SendEmailAsync(
        email,
        "Reset Password",
        $"Please reset your password by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>."
      );

      return Ok();
    }

    [HttpGet]
    [Route("[area]/[controller]/[action]")]
    public IActionResult ResetPassword([FromQuery] string code)
    {
      if (code == null)
      {
        return BadRequest("A code must be supplied for password reset.");
      }
      else
      {
        return Redirect($"/resetPassword?c={code}");
      }
    }

    [HttpPost]
    [Route("api/[area]/[controller]/[action]")]
    public async Task<IActionResult> ChangePassword([FromBody] PasswordResetViewModel model)
    {
      var user = await userManager.FindByEmailAsync(model.Email);
      if (user == null)
      {
        return BadRequest();
      }

      var result = await userManager.ResetPasswordAsync(user, model.Code, model.Password);
      if (result.Succeeded)
      {
        return Ok();
      }

      return BadRequest(result.Errors.First().Description);
    }
  }
}
