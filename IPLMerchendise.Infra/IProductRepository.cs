using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IPLMerchendise.Domain;
using IPLMerchendise.Domain.Common;

namespace IPLMerchendise.Infra
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        Task<PagedResult<Product>> GetProductsAsync(ProductSearchRequest productSearchRequest);
    }
}
