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
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IMapper mapper)
        {
            this._orderRepository = orderRepository;
            this._mapper = mapper;
            this._productRepository = productRepository;
        }

        public async Task<int> CreaterOrderAsync(int userId, List<OrderItemDTO> orderItems)
        {
            var products = await this._productRepository.GetProductsAsync(orderItems.Select(_ => _.ProductId).ToList());
            foreach (var item in orderItems)
            {
                item.Price = products.ToList().Find(_ => _.Id == item.ProductId)?.Price;
            }
            var order = new Order()
            {
                UserId = userId,
                Status = OrderStatus.Succeded,
                CreatedAt = DateTime.UtcNow,
                TotalAmount = orderItems.Sum(_ => _.TotalPrice),
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
            var products = await this._productRepository.GetProductsAsync(orders.SelectMany(_ => _.Items).Select(_ => _.ProductId).ToList());

            var mappedOrders = this._mapper.Map<IEnumerable<OrderDTO>>(orders);
            foreach (var order in mappedOrders)
            {
                foreach (var item in order.Items)
                {
                    var product = products.ToList().Find(_ => _.Id == item.ProductId);
                    item.ProductName = product != null ? product.Name : string.Empty;
                }
            }
            return mappedOrders;
        }
    }
}
