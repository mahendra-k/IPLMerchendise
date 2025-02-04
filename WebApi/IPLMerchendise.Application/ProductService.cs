using AutoMapper;
using IPLMerchendise.Application.DTOs;
using IPLMerchendise.Domain;
using IPLMerchendise.Domain.Common;
using IPLMerchendise.Infra;

namespace IPLMerchendise.Application
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductService(IProductRepository _productRepository, IMapper mapper) 
        {
            this._productRepository = _productRepository;
            this._mapper = mapper;
        }

        public async Task<PagedResult<ProductDTO>> GetProducts(ProductSearchRequest productSearchRequest)
        {
            var result = await this._productRepository.GetProductsAsync(productSearchRequest);
            var products = _mapper.Map<IEnumerable<ProductDTO>>(result.Items);
            return new PagedResult<ProductDTO>() 
            {
                Items = products,
                PageNumber = result.PageNumber,
                PageSize = result.PageSize,
                TotalCount = result.TotalCount
            };
        }

        public async Task<ProductDTO> GetProduct(int productId)
        {
            return _mapper.Map<ProductDTO>(await this._productRepository.GetByIdAsync(productId));
        }
    }
}
