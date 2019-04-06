using System.Text.Encodings.Web;
using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Entities;
using CoraCorpMCM.App.Account.Interfaces.Services;
using CoraCorpMCM.App.Shared.Interfaces.Services;

namespace CoraCorpMCM.App.Account.Services
{
  public class EmailConfirmationService : IEmailConfirmationService
  {
    private readonly IEmailSender emailSender;
    public EmailConfirmationService(IEmailSender emailSender)
    {
      this.emailSender = emailSender;

    }
    public async Task SendConfirmationEmailAsync(ApplicationUser user, string callbackUrl)
    {
      await emailSender.SendEmailAsync(user.Email, "Confirm your email",
        $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");
    }
  }
}
