using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IPLMerchendise.Application.DTOs
{
    public class OrderItemDTO
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }

        public int Quantity { get; set; }
        public decimal? Price { get; set; }

        public decimal TotalPrice
        {
            get
            {
                return this.Price.HasValue ? this.Quantity * this.Price.Value : 0;
            }
        }
    }
}
