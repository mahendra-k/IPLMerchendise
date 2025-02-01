using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            return _mapper.Map<PagedResult<ProductDTO>>(result);
        }
    }
}
