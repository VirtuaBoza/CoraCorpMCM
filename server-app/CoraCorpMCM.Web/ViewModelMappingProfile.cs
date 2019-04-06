using AutoMapper;
using CoraCorpMCM.App.Collection.Entities;
using CoraCorpMCM.Web.Areas.Collection.Models;

namespace CoraCorpMCM.Web
{
    public class ViewModelMappingProfile : Profile
    {
        public ViewModelMappingProfile()
        {
            CreateMap<ItemViewModel, Item>().ReverseMap();
        }
    }
}