using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoraCorpMCM.App.Interfaces;
using CoraCorpMCM.App.Interfaces.Entities;
using CoraCorpMCM.App.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CoraCorpMCM.Data.Repositories
{
    public class MuseumEntityRepository<T, TId> : IMuseumEntityRepository<T, TId> where T : class, IMuseumEntity<TId>
    {
        private readonly ApplicationContext context;

        public MuseumEntityRepository(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<T>> GetAllAsync(int museumId)
        {
            return await context.Set<T>().Where(x => x.MuseumId == museumId).ToListAsync();
        }
    }
}