using System;
using System.Collections.Generic;
using System.Security.Claims;
using AutoMapper;
using CoraCorpMCM.App.Account.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace CoraCorpMCM.Web.UnitTests
{
    public class BaseControllerTests
    {
      protected Mock<ClaimsPrincipal> mockUser;
      protected Guid museumId = Guid.Empty;

      public virtual void Initialize()
      {
        Mapper.Reset();
        Mapper.Initialize(cfg => {
          cfg.AddProfile<ViewModelMappingProfile>();
        });

        mockUser = new Mock<ClaimsPrincipal>();
        mockUser
          .Setup(u => u.Claims)
          .Returns(new List<Claim>
            {
              new Claim(AppClaimTypes.MUSEUM_ID, museumId.ToString())
            });
      }

      protected void SetupControllerContext(ControllerBase controller)
      {
        controller.ControllerContext = new ControllerContext
        {
          HttpContext = new DefaultHttpContext
          {
            User = mockUser.Object,
          },
        };
      }

      protected T GetObjectResultValue<T, TResult>(IActionResult actionResult) 
        where TResult : ObjectResult
        where T : class
      {
        return (actionResult as TResult).Value as T;
      }

      protected T GetObjectResultValue<T>(IActionResult actionResult) 
        where T : class
      {
        return (actionResult as ObjectResult).Value as T;
      }

      protected object GetObjectResultValue(IActionResult actionResult) 
      {
        return (actionResult as ObjectResult).Value;
      }
    }
}