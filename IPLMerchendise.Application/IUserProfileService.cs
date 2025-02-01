using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IPLMerchendise.Application.DTOs;

namespace IPLMerchendise.Application
{
    public interface IUserProfileService
    {
        Task<int> CreateUserProfileAsync(UserProfileDTO userProfile);

        Task<UserProfileDTO> GetUserProfileAsync(int id);
    }
}
