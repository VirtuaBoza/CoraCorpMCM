using System;
using System.Threading.Tasks;
using CoraCorpMCM.App.Collection.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoraCorpMCM.Web.Areas.Collection.Controllers
{
  [Area("Collection")]
  [Route("api/[area]/[controller]")]
  [ApiController]
  [Authorize(Policy = "EmailConfirmed")]
  public class ItemController : ControllerBase
  {
    private readonly IItemRepository itemRepository;

    public ItemController(IItemRepository itemRepository)
    {
      this.itemRepository = itemRepository;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var museumId = new Guid("5f624638-9e47-4d01-99ae-08d67d8b3ff0");
      var items = await itemRepository.GetAllAsync(museumId);
      return Ok(items);
    }

    [HttpGet("{id}", Name = "Get")]
    public IActionResult Get(int id)
    {
      return Ok("value");
    }

    [HttpPost]
    public IActionResult Post([FromBody] string value)
    {
      return Ok();
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
