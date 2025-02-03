using IPLMerchendise.Domain.Common;

namespace IPLMerchendise.Infra
{
    public interface IBaseRepository<T> where T : BaseDomain
    {
        Task<int> AddAsync(T entity);

        Task<IEnumerable<T>> GetAllAsync();

        Task<PagedResult<T>> GetPagedResultAsync(int pageIndex, int pageSize);

        Task<T> GetByIdAsync(int id);

        Task<bool> UpdateAsync(T entity);

        Task<bool> DeleteAsync(int id);
    }
}
