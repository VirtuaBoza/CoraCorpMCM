using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Entities;
using CoraCorpMCM.App.Account.Interfaces.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CoraCorpMCM.App.Account.Services
{
  public class IdentityTokenService : IIdentityTokenService
  {
    private readonly UserManager<ApplicationUser> userManager;
    private readonly IConfiguration configuration;

    public IdentityTokenService(
      UserManager<ApplicationUser> userManager,
      IConfiguration configuration)
    {
      this.userManager = userManager;
      this.configuration = configuration;
    }

    public async Task<string> CreateTokenAsync(ApplicationUser user)
    {
      var claims = new List<Claim>
      {
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        new Claim("museum_id", user.MuseumId.ToString()),
      };
      var roles = await userManager.GetRolesAsync(user);
      claims.AddRange(roles.Select(claim => new Claim("roles", claim)));
      var emailConfirmed = await userManager.IsEmailConfirmedAsync(user);
      claims.Add(new Claim("email_confirmed", emailConfirmed.ToString()));

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Tokens:Identity:Key"]));
      var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
      int.TryParse(configuration["Tokens:Identity:Lifetime"], out var lifetime);

      var token = new JwtSecurityToken(
        issuer: configuration["Tokens:Identity:Issuer"],
        audience : configuration["Tokens:Identity:Audience"],
        claims : claims,
        expires : DateTime.UtcNow.AddHours(lifetime),
        signingCredentials : signingCredentials
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }
  }
}
