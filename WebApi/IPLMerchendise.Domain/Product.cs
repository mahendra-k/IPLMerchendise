using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IPLMerchendise.Domain.Common;

namespace IPLMerchendise.Domain
{
    public class Product : BaseDomain<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string CurrencyCode { get; set; }
        public decimal Price { get; set; }
        public int FranchiseId { get; set; }
        public string ImageUrl { get; set; }
        public int StockQuantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
