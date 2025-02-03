using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IPLMerchendise.Application.DTOs;
using IPLMerchendise.Domain;
using IPLMerchendise.Domain.Common;

namespace IPLMerchendise.Application
{
    public interface IProductService
    {
        Task<PagedResult<ProductDTO>> GetProducts(ProductSearchRequest productSearchRequest);

        Task<ProductDTO> GetProduct(int productId);
    }
}
