using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using IPLMerchendise.Application.DTOs;
using IPLMerchendise.Domain;

namespace IPLMerchendise.Application
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<Product, ProductDTO>().ReverseMap();

            CreateMap<UserProfile, UserProfileDTO>().ReverseMap();
        }
    }
}
