using ChatAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ChatAPI.Database;

namespace ChatAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : Controller
    {
        private readonly AppDbContext _context;

        public MessageController(AppDbContext context)
        {
            _context = context;
        }
        
        [HttpGet("getmessages")]
        public async Task<ActionResult<List<Message>>> GetMessages()
        {
            return await _context.Messages.ToListAsync();
        }

        [HttpPost("sendmessage")]
        public async Task<ActionResult<string>> SendMessage(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            return message.Body;
        }

        [HttpGet("getmessages/{page}")]
        public async Task<ActionResult<MessageResponse>> GetMessagesPagination(int page)
        {
            
            var pageResults = 3f;

            var messages = await _context.Messages.Skip((page - 1) * (int)pageResults).Take((int)pageResults).ToListAsync();
            
            var messageResponse = new MessageResponse();
            
            messageResponse.Messages = messages;
            messageResponse.CurrentPage = page;
            
            return messageResponse;

        }
    }
}

