using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using IPLMerchendise.Application.DTOs;
using IPLMerchendise.Domain;
using IPLMerchendise.Infra;

namespace IPLMerchendise.Application
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IMapper _mapper;

        public UserProfileService(IUserProfileRepository userProfileRepository, IMapper mapper) 
        {
            this._userProfileRepository = userProfileRepository;
            this._mapper = mapper;
        }

        public async Task<int> CreateUserProfileAsync(UserProfileDTO userProfile)
        {
            var user = this._mapper.Map<UserProfile>(userProfile);
            return await this._userProfileRepository.AddAsync(user);
        }

        public async Task<UserProfileDTO> GetUserProfileAsync(int id)
        {
            return this._mapper.Map<UserProfileDTO>(await this._userProfileRepository.GetByIdAsync(id));
        }
    }
}
