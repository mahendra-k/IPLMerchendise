﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IPLMerchendise.Application.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CurrencyCode { get; set; }
        public decimal Price { get; set; }
        public int FranchiseId { get; set; }
        public string ImageUrl { get; set; }
        public int StockQuantity { get; set; }
    }
}
