using ChatAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ChatAPI.Database;
using System.Text.Json;
using System.Text;

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
        
        [HttpGet("messages")]
        public async Task GetMessages()
        {
            List<Message> chatMessages = await _context.Messages.ToListAsync();

            Response.Headers.Add("Content-Type", "text/event-stream");

            string message = $"data: {JsonSerializer.Serialize(chatMessages)}\n\n";


            byte[] messageBytes = ASCIIEncoding.ASCII.GetBytes(message);
            await Response.Body.WriteAsync(messageBytes, 0, messageBytes.Length);
            await Response.Body.FlushAsync();

       
        }

        [HttpPost("sendmessage")]
        public async Task<ActionResult<string>> SendMessage(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            return message.Body;
        }

        [HttpGet("messages/{page}")]
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

