using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IPLMerchendise.Domain
{
    public class ProductSearchRequest
    {
        public ProductSearchRequest() 
        {
            this.PageSize = 50;
            this.PageNumber = 1;
        }

        public int PageSize { get; set; }

        public int PageNumber { get; set; }

        public List<int>? FranchiseIds { get; set; }

        public decimal MinPrice { get; set; }

        public decimal MaxPrice { get; set; }

        public string? SearchText { get; set; }
    }
}
