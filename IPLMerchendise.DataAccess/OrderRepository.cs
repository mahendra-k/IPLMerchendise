using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using IPLMerchendise.Domain;
using IPLMerchendise.Domain.Common;
using IPLMerchendise.Infra;

namespace IPLMerchendise.DataAccess
{
    public class OrderRepository : IOrderRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public OrderRepository(IUnitOfWork unitOfWork) 
        {
            this._unitOfWork = unitOfWork;
        }
        public async Task<int> AddAsync(Order order)
        {
            _unitOfWork.BeginTransaction();

            try
            {
                // Insert order
                var orderQuery = @"INSERT INTO [Order] (UserId, TotalAmount) 
                               VALUES (@UserId, @TotalAmount);
                               SELECT SCOPE_IDENTITY();";
                int orderId = await _unitOfWork.Connection.ExecuteScalarAsync<int>(orderQuery, order, _unitOfWork.Transaction);

                // Insert order items
                foreach (var item in order.Items)
                {
                    var orderItemQuery = @"INSERT INTO OrderItem (OrderId, ProductId, Quantity, Price) 
                                       VALUES (@OrderId, @ProductId, @Quantity, @Price);";
                    await _unitOfWork.Connection.ExecuteAsync(orderItemQuery, new
                    {
                        OrderId = orderId,
                        item.ProductId,
                        item.Quantity,
                        item.Price
                    }, _unitOfWork.Transaction);
                }

                _unitOfWork.Commit();
                return orderId;
            }
            catch
            {
                _unitOfWork.Rollback();
                throw;
            }
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Order>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId) 
        {
            var sql = @"SELECT * FROM [Order] WHERE UserId = @UserId;
                    SELECT * FROM OrderItem WHERE OrderId IN 
                    (SELECT Id FROM [Order] WHERE UserId = @UserId);";

            using var multi = await this._unitOfWork.Connection.QueryMultipleAsync(sql, new { UserId = userId });

            var orders = (await multi.ReadAsync<Order>()).ToList();
            var items = (await multi.ReadAsync<OrderItem>()).ToList();

            foreach (var order in orders)
                order.Items = items.Where(i => i.OrderId == order.Id).ToList();

            return orders;
        }

        public async Task<Order> GetByIdAsync(int orderId)
        {
            var sql = @"SELECT * FROM [Order] WHERE Id = @OrderId;
                    SELECT * FROM OrderItem WHERE OrderId = @OrderId;";

            using var multi = await this._unitOfWork.Connection.QueryMultipleAsync(sql, new { OrderId = orderId });

            var order = await multi.ReadFirstOrDefaultAsync<Order>();
            if (order != null)
                order.Items = (await multi.ReadAsync<OrderItem>()).ToList();

            return order;
        }

        public Task<PagedResult<Order>> GetPagedResultAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(Order entity)
        {
            throw new NotImplementedException();
        }
    }
}
