using ChatAPI.Database;
using ChatAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace ChatAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IMemoryCache _memoryCache;
        public UserController(IMemoryCache memorycache, AppDbContext context)
        {
            _context = context;
            _memoryCache = memorycache;
        }

        [HttpPost("loginuser")]
        public ActionResult<User> LoginUser(User previousUser)
        {
            
            var user = new User();
            Random random = new Random();

            int stringLength = random.Next(5, 10);
            if (previousUser.Username == "")
            {
                for (int i = 0; i < stringLength; i++)
                {
                    user.Username += Convert.ToChar(random.Next(0, 26) + 65);
                }
            }
            else
            {
                user.Username = previousUser.Username;
            }
            //user.Username = "Muharem";
            //HttpContext.Session.SetString("username", user.Username);

            string activeUsersKey = "activeusers";
            List<User> activeUsers;
            if (!_memoryCache.TryGetValue(activeUsersKey, out activeUsers))
            {

                activeUsers = new List<User> { user };
                _memoryCache.Set(activeUsersKey, activeUsers);

            }
            else
            {
                activeUsers.Add(user);
                _memoryCache.Set(activeUsersKey, activeUsers);
            }

            //Response.Headers.Add("Content-Type", "text/event-stream");

            //string message = $"data: {JsonSerializer.Serialize(activeUsers)}\n\n";


            /*for (int i = 0; i < data.Length; i++)
            {
                await Task.Delay(TimeSpan.FromMilliseconds(200));
                //string message = $"data:{i + 1}.{data[i]}\n\n";
                byte[] messageBytes = ASCIIEncoding.ASCII.GetBytes(message);
                await Response.Body.WriteAsync(messageBytes, 0, messageBytes.Length);
                await Response.Body.FlushAsync();

            }*/
            //await Task.Delay(TimeSpan.FromMilliseconds(1000));

            return user;
            
        }

        [HttpGet("activeusers")]
        public async Task GetActiveUsers()
        {
            string activeUsersKey = "activeusers";
            List<User> activeUsers;
            if (!_memoryCache.TryGetValue(activeUsersKey, out activeUsers))
            {
                User newUser = new User();
                newUser.Username = "Nema nista u cache";
                //return new List<User> { newUser };

            }

            Response.Headers.Add("Content-Type", "text/event-stream");

            string message = $"data: {JsonSerializer.Serialize(activeUsers)}\n\n";


            byte[] messageBytes = ASCIIEncoding.ASCII.GetBytes(message);
            await Response.Body.WriteAsync(messageBytes, 0, messageBytes.Length);
            await Response.Body.FlushAsync();

            //return activeUsers;

        }

        [HttpDelete("removefromcache/{username}")]
        public void RemoveFromCache(string username)
        {
            List<User> activeUsers;
            string activeUsersKey = "activeusers";
            _memoryCache.TryGetValue(activeUsersKey, out activeUsers);
            try { 
                var userToRemove = activeUsers.Single(user => user.Username == username);
                activeUsers.Remove(userToRemove);
            }
            catch (Exception e)
            {
                // recover from exception
            }

        }

        
    }
}
