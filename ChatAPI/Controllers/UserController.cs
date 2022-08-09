using ChatAPI.Database;
using ChatAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace ChatAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("loginuser")]
        public ActionResult<User> LoginUser()
        {
            var user = new User();
            Random random = new Random();

            int stringLength = random.Next(5, 10);

            for (int i = 0; i < stringLength; i++)
            {
                user.Username += Convert.ToChar(random.Next(0, 26) + 65);
            }
            user.Username = "Muharem";
            HttpContext.Session.SetString("username", user.Username);
            
            return user;
        }

        
    }
}
