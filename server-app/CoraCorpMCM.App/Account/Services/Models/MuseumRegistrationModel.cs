using System.ComponentModel.DataAnnotations;

namespace CoraCorpMCM.App.Account.Services.Models
{
  public class MuseumRegistrationModel
  {
    [Required]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    public string MuseumName { get; set; }
  }
}
