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
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserProfileRepository(IUnitOfWork unitOfWork) 
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<int> AddAsync(UserProfile user)
        {
            var sql = @"INSERT INTO UserProfile (Name, Email, Phone, Address) 
                    VALUES (@Name, @Email, @Phone, @Address);
                    SELECT SCOPE_IDENTITY();";
            return await _unitOfWork.Connection.ExecuteScalarAsync<int>(sql, user);
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<UserProfile>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<UserProfile> GetByIdAsync(int id)
        {
            return await this._unitOfWork.Connection.QuerySingleAsync<UserProfile>("Select * from UserProfile where Id = @Id", new { Id = id });
        }

        public Task<PagedResult<UserProfile>> GetPagedResultAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(UserProfile entity)
        {
            throw new NotImplementedException();
        }
    }
}
