using System.ComponentModel.DataAnnotations;

namespace CoraCorpMCM.Web.Areas.Account.ViewModels
{
  public class CredentialViewModel
  {
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
  }
}
