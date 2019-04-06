using System;
using System.Linq;
using System.Threading.Tasks;
using CoraCorpMCM.App.Account.Constants;
using CoraCorpMCM.App.Collection.Entities;
using CoraCorpMCM.App.Collection.Interfaces.Repositories;
using CoraCorpMCM.App.Shared.Interfaces;
using CoraCorpMCM.Web.Areas.Collection.Models;
using CoraCorpMCM.Web.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoraCorpMCM.Web.Areas.Collection.Controllers
{
  [Area("Collection")]
  [Route("api/[area]/[controller]")]
  [ApiController]
  [Authorize(Policy = "EmailConfirmed")]
  public class ItemsController : ControllerBase
  {
    private readonly IItemRepository itemRepository;
    private readonly IUnitOfWork unitOfWork;

    public ItemsController(IItemRepository itemRepository, IUnitOfWork unitOfWork)
    {
      this.itemRepository = itemRepository;
      this.unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var items = await itemRepository.GetAllAsync(User.GetMuseumId());
      return Ok(items);
    }

    [HttpGet("{id}", Name = "Get")]
    public async Task<IActionResult> Get(Guid id)
    {
      var item = await itemRepository.GetAsync(id);
      return Ok(item);
    }

    [HttpPost]
    public IActionResult Post([FromBody] ItemViewModel itemViewModel)
    {
      var item = new Item
      {
        MuseumId = User.GetMuseumId(),
        Title = itemViewModel.Title
      };

      itemRepository.Add(item);
      unitOfWork.SaveChangesAsync();

      return Ok(item);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] string value)
    {
      return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      return Ok();
    }
  }
}
