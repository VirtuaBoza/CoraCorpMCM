using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
    private readonly IMapper mapper;

    public ItemsController(IItemRepository itemRepository, IUnitOfWork unitOfWork, IMapper mapper)
    {
      this.itemRepository = itemRepository;
      this.unitOfWork = unitOfWork;
      this.mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var items = await itemRepository.GetAllAsync(User.GetMuseumId());

      return Ok(mapper.Map<IEnumerable<ItemViewModel>>(items));
    }

    [HttpGet("{id}", Name = "Get")]
    public async Task<IActionResult> Get(Guid id)
    {
      var item = await itemRepository.GetAsync(id);
      if (item == null)
      {
        return NotFound();
      }

      return Ok(mapper.Map<ItemViewModel>(item));
    }

    [HttpPost]
    [Authorize(Roles = Roles.CONTRIBUTOR_AND_UP)]
    public async Task<IActionResult> Post([FromBody] ItemViewModel itemViewModel)
    {
      var item = mapper.Map<Item>(itemViewModel);
      itemRepository.Add(item, User.GetMuseumId());
      await unitOfWork.SaveChangesAsync();

      return Ok(mapper.Map<ItemViewModel>(item));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = Roles.CONTRIBUTOR_AND_UP)]
    public async Task<IActionResult> Put(Guid id, [FromBody] ItemViewModel itemViewModel)
    {
      if (!itemViewModel.Id.HasValue || id != itemViewModel.Id.Value)
      {
        return BadRequest();
      }

      var item = mapper.Map<Item>(itemViewModel);
      await itemRepository.UpdateAsync(item, User.GetMuseumId());
      await unitOfWork.SaveChangesAsync();

      return Ok();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = Roles.ADMINISTRATOR_AND_UP)]
    public async Task<IActionResult> Delete(Guid id)
    {
      await itemRepository.DeleteAsync(id, User.GetMuseumId());
      await unitOfWork.SaveChangesAsync();

      return Ok();
    }
  }
}
