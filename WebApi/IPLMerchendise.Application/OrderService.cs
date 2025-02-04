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
                var product = products.ToList().Find(_ => _.Id == item.ProductId);
                item.Price = product?.Price;
                item.CurrencyCode = product.CurrencyCode;
            }
            var order = new Order()
            {
                UserId = userId,
                Status = OrderStatus.Succeded,
                OrderDate = DateTime.UtcNow,
                TotalAmount = orderItems.Sum(_ => _.TotalPrice),
                CurrencyCode = orderItems.First().CurrencyCode,
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

            var mappedOrders = this._mapper.Map<IEnumerable<OrderDTO>>(orders.OrderByDescending(_=>_.OrderDate));
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
