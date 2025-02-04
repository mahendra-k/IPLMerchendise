using IPLMerchendise.Application.DTOs;

namespace IPLMerchendise.Application
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDTO>> GetOrdersByUserIdAsync(int userId);

        Task<OrderDTO> GetOrderAsync(int orderId);

        Task<int> CreaterOrderAsync(int userId, List<OrderItemDTO> orderItems);
    }
}
