using System;
using System.Linq;
using System.Security.Claims;
using CoraCorpMCM.App.Account.Constants;

namespace CoraCorpMCM.Web.Extensions
{
  public static class ClaimsPrincipalExtensions
  {
    public static Guid GetMuseumId(this ClaimsPrincipal user)
    {
      var museumIdClaimValue = user.Claims.ToList()
        .Find(c => c.Type == AppClaimTypes.MUSEUM_ID)?.Value;
      return new Guid(museumIdClaimValue);
    }
  }
}