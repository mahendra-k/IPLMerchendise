using IPLMerchendise.Application;
using IPLMerchendise.Application.DTOs;
using IPLMerchendise.Infra;
using Microsoft.AspNetCore.Mvc;

namespace IPLMerchendise.API.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            this._orderService = orderService;
        }

        [HttpGet("{orderId}")]
        public async Task<OrderDTO> GetOrder(int orderId)
        {
            return await this._orderService.GetOrderAsync(orderId);
        }

        [HttpGet("users/{userId}")]
        public async Task<IEnumerable<OrderDTO>> GetOrdersByUserId(int userId)
        {
            return await this._orderService.GetOrdersByUserIdAsync(userId);
        }

        [HttpPost("users/{userId}")]
        public async Task<int> CreateOrder(int userId, [FromBody]List<OrderItemDTO> orderItemDTOs) 
        {
            return await this._orderService.CreaterOrderAsync(userId, orderItemDTOs);
        }
    }
}
