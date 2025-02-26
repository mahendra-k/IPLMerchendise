﻿using AutoMapper;
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

            CreateMap<Order, OrderDTO>().ReverseMap();

            CreateMap<OrderItem, OrderItemDTO>().ReverseMap();
        }
    }
}
