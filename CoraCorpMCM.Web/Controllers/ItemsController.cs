using Microsoft.AspNetCore.Mvc;

namespace CoraCorpMCM.Web.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ItemController : ControllerBase
  {
    [HttpGet]
    public IActionResult Get()
    {
      return Ok(new string[] { "value1", "value2", "value3" });
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
