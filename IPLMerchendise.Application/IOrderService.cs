using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IPLMerchendise.Application.DTOs;

namespace IPLMerchendise.Application
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDTO>> GetOrdersAsync(int userId);

        Task<OrderDTO> GetOrderAsync(int orderId);
    }
}
