using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IPLMerchendise.Domain.Common;

namespace IPLMerchendise.Domain
{
    public class OrderItem : BaseDomain<int>
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string CurrencyCode { get; set; }
        public decimal TotalPrice
        {
            get
            {
                return this.Quantity * this.Price;
            }
        }
    }
}
