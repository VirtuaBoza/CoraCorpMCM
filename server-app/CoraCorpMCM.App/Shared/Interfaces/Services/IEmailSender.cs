using System.Threading.Tasks;

namespace CoraCorpMCM.App.Shared.Interfaces.Services
{
  public interface IEmailSender
  {
    Task SendEmailAsync(string email, string subject, string message);
  }
}
