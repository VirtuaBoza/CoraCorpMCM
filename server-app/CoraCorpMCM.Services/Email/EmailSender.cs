using System.Threading.Tasks;
using CoraCorpMCM.App.Shared.Interfaces.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace CoraCorpMCM.Services.Email
{
  public class EmailSender : IEmailSender
  {
    public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
    {
      Options = optionsAccessor.Value;
    }

    public AuthMessageSenderOptions Options { get; }

    public Task SendEmailAsync(string email, string subject, string message)
    {
      var client = new SendGridClient(Options.SendGridKey);
      var msg = new SendGridMessage
      {
        From = new EmailAddress("andrew.m.boza@gmail.com", "Andrew Boza"),
        Subject = subject,
        PlainTextContent = message,
        HtmlContent = message,
      };
      msg.AddTo(new EmailAddress(email));

      // Disable click tracking.
      // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html
      msg.SetClickTracking(false, false);

      return client.SendEmailAsync(msg);
    }
  }
}
