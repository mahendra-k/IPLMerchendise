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
