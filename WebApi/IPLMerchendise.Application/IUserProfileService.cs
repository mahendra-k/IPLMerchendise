using IPLMerchendise.Application.DTOs;

namespace IPLMerchendise.Application
{
    public interface IUserProfileService
    {
        Task<int> CreateUserProfileAsync(UserProfileDTO userProfile);

        Task<UserProfileDTO> GetUserProfileAsync(int id);
    }
}
