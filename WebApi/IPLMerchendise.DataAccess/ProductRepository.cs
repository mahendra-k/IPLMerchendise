using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Core;
using Dapper;
using IPLMerchendise.Domain;
using IPLMerchendise.Domain.Common;
using IPLMerchendise.Infra;

namespace IPLMerchendise.DataAccess
{
    public class ProductRepository : IProductRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductRepository(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public Task<int> AddAsync(Product entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Product>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            return await this._unitOfWork.Connection.QuerySingleAsync<Product>("Select * from Product where Id = @Id", new { Id = id });
        }

        public Task<PagedResult<Product>> GetPagedResultAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<Product>> GetProductsAsync(ProductSearchRequest productSearchRequest)
        {
            var query = new StringBuilder("SELECT * FROM [ProductDetailsView] WHERE 1=1");
            var countQuery = new StringBuilder("SELECT COUNT(Id) FROM [ProductDetailsView] WHERE 1=1");
            var parameters = new DynamicParameters();

            if (!string.IsNullOrEmpty(productSearchRequest.SearchText))
            {
                query.Append(" AND (Name LIKE @Name OR FranchiseName LIKE @Name OR FranchiseCode LIKE @Name OR ProductType LIKE @Name)");
                countQuery.Append(" AND Name LIKE @Name");
                parameters.Add("Name", $"%{productSearchRequest.SearchText}%");
            }

            var totalCount = await _unitOfWork.Connection.ExecuteScalarAsync<int>(countQuery.ToString(), parameters, _unitOfWork.Transaction);

            query.Append(" ORDER BY Name OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY");

            parameters.Add("Offset", (productSearchRequest.PageNumber - 1) * productSearchRequest.PageSize);
            parameters.Add("PageSize", productSearchRequest.PageSize);
            var products = await _unitOfWork.Connection.QueryAsync<Product>(query.ToString(), parameters, _unitOfWork.Transaction);
            return new PagedResult<Product>()
            {
                Items = products,
                PageNumber = productSearchRequest.PageNumber,
                PageSize = productSearchRequest.PageSize,
                TotalCount = totalCount
            };
        }

        public Task<bool> UpdateAsync(Product entity)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Product>> GetProductsAsync(List<int> productIds)
        {
            if (productIds == null || productIds.Count == 0)
            {
                return new List<Product>();
            }

            var query = @"
            SELECT 
                Id,
                Name,
                Description,
                CurrencyCode,
                Price,
                ProductType,
                ImageUrl
            FROM dbo.Product
            WHERE Id IN @ProductIds";

            return await this._unitOfWork.Connection.QueryAsync<Product>(query, new { ProductIds = productIds });
        }
    }
}
