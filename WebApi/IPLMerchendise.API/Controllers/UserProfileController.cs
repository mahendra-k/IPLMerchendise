using IPLMerchendise.Application;
using IPLMerchendise.Application.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IPLMerchendise.API.Controllers
{
    [Route("api/userProfile")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;

        public UserProfileController(IUserProfileService userProfileService) 
        {
            this._userProfileService = userProfileService;
        }

        [HttpPost]
        public async Task<int> CreateUser([FromBody] UserProfileDTO userProfile) 
        {
            return await this._userProfileService.CreateUserProfileAsync(userProfile);
        }

        [HttpGet("{userId}")]
        public async Task<UserProfileDTO> GetUserProfile(int userId) 
        {
            return await this._userProfileService.GetUserProfileAsync(userId);
        }
    }
}
