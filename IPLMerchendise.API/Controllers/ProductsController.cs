using IPLMerchendise.Application;
using IPLMerchendise.Domain;
using IPLMerchendise.Infra;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IPLMerchendise.API.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            this._productService = productService;
        }

        // Get all products
        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] ProductSearchRequest productSearchRequest)
        {
            var products = await _productService.GetProducts(productSearchRequest);
            return Ok(products);
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetProduct(int productId) 
        {
            return Ok(await _productService.GetProduct(productId));
        }
    }
}
