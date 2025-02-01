using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IPLMerchendise.Application.DTOs;
using IPLMerchendise.Domain;

namespace IPLMerchendise.Application
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDTO>> GetOrdersByUserIdAsync(int userId);

        Task<OrderDTO> GetOrderAsync(int orderId);

        Task<int> CreaterOrderAsync(int userId, List<OrderItemDTO> orderItems);
    }
}
