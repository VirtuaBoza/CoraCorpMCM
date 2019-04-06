using System.Threading.Tasks;

namespace CoraCorpMCM.App.Shared.Interfaces
{
    public interface IUnitOfWork
    {
         Task SaveChangesAsync();
    }
}