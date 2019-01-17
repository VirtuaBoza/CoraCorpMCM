using System;
using CoraCorpMCM.App.Interfaces;
using CoraCorpMCM.App.Interfaces.Entities;

namespace CoraCorpMCM.App.Entities
{
    public class Item : IMuseumEntity<Guid>
    {
        public Guid Id { get; set; }
        public int MuseumId { get; set; }
    }
}