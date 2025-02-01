using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using IPLMerchendise.Application.DTOs;
using IPLMerchendise.Infra;

namespace IPLMerchendise.Application
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IMapper mapper) 
        {
            this._orderRepository = orderRepository;
            this._mapper = mapper;
        }

        public Task<OrderDTO> GetOrderAsync(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OrderDTO>> GetOrdersAsync(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
