using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace CoraCorpMCM.Web.Hubs
{
  public class MuseumHub : Hub
  {
    public async Task JoinGroup(string museumId)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, museumId);
    }
  }
}
