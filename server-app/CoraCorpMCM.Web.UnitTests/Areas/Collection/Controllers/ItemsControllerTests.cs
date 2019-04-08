using AutoMapper;
using CoraCorpMCM.App.Collection.Entities;
using CoraCorpMCM.App.Collection.Interfaces.Repositories;
using CoraCorpMCM.App.Shared.Interfaces;
using CoraCorpMCM.Web.Areas.Collection.Controllers;
using CoraCorpMCM.Web.Areas.Collection.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Security.Principal;
using System.Security.Claims;
using CoraCorpMCM.App.Account.Constants;
using System.Linq;
using CoraCorpMCM.Web.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace CoraCorpMCM.Web.UnitTests.Areas.Collection.Controllers
{
  [TestClass]
  public class ItemsControllerTests : BaseControllerTests
  {
    private ItemsController itemsController;

    private Mock<IItemRepository> mockItemRepository;
    private Mock<IUnitOfWork> mockUnitOfWork;
    private Mock<IHubContext<MuseumHub>> mockHubContext;

    [TestInitialize]
    public override void Initialize()
    {
      base.Initialize();

      mockItemRepository = new Mock<IItemRepository>();
      mockUnitOfWork = new Mock<IUnitOfWork>();
      mockHubContext = new Mock<IHubContext<MuseumHub>>();

      itemsController = new ItemsController(
        mockItemRepository.Object,
        mockUnitOfWork.Object,
        Mapper.Instance,
        mockHubContext.Object);

      SetupControllerContext(itemsController);
    }

    [TestMethod]
    public async Task Get_ReturnsIEnumberableOfItemViewModels()
    {
      // Act
      var result = await itemsController.Get();

      // Assert
      Assert.IsInstanceOfType(GetObjectResultValue(result), typeof(IEnumerable<ItemViewModel>));
    }

    [TestMethod]
    public async Task Get_ReturnsItemsFromRepository()
    {
      // Arrange
      mockItemRepository
        .Setup(r => r.GetAllAsync(museumId))
        .ReturnsAsync(new List<Item>{ new Item { Title = "Test" }});

      // Act
      var result = await itemsController.Get();

      // Assert
      var viewModels = GetObjectResultValue<IEnumerable<ItemViewModel>>(result);
      Assert.IsNotNull(viewModels.ToList().Find(i => i.Title == "Test"));
    }
  }
}