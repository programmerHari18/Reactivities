using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        public UserManager<AppUser> UserManager { get; }
        public TokenService TokenService { get; set; }
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            TokenService = tokenService;
            UserManager = userManager;   
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
        {
            var user = await UserManager.FindByEmailAsync(loginDto.Email);

            if(user == null)
            {
                return Unauthorized();
            }
            var result = await UserManager.CheckPasswordAsync(user, loginDto.Password);

            if(result)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserManager.Users.AnyAsync(x=> x.UserName == registerDTO.UserName))
            {
                ModelState.AddModelError("username","User Name taken");
                return ValidationProblem();
            }

            if (await UserManager.Users.AnyAsync(x=> x.Email == registerDTO.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.UserName
            };
            var result = await UserManager.CreateAsync(user, registerDTO.Password);

            if(result.Succeeded)
            {
                return new UserDTO
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = TokenService.CreateToken(user),
                    Username = user.UserName
                };
            }
            return BadRequest(result.Errors);
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);

        }
        private UserDTO CreateUserObject(AppUser user)
        {
            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = TokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}