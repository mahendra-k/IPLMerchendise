using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using IPLMerchendise.Application.DTOs;
using IPLMerchendise.Domain;
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

        public async Task<int> CreaterOrderAsync(int userId, List<OrderItemDTO> orderItems)
        {
            var order = new Order()
            {
                UserId = userId,
                Status = OrderStatus.Succeded,
                Items = this._mapper.Map<List<OrderItem>>(orderItems)
            };

            return await this._orderRepository.AddAsync(order);
        }

        public async Task<OrderDTO> GetOrderAsync(int orderId)
        {
            var order = await this._orderRepository.GetByIdAsync(orderId);
            return this._mapper.Map<OrderDTO>(order);
        }

        public async Task<IEnumerable<OrderDTO>> GetOrdersByUserIdAsync(int userId)
        {
            var orders = await this._orderRepository.GetOrdersByUserIdAsync(userId);
            return this._mapper.Map<IEnumerable<OrderDTO>>(orders);
        }
    }
}
