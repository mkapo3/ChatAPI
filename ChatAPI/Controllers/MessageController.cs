using ChatAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ChatAPI.Database;
using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Caching.Memory;

namespace ChatAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IMemoryCache _memoryCache;

        public MessageController(IMemoryCache memorycache, AppDbContext context)
        {
            _context = context;
            _memoryCache = memorycache;
        }

        [HttpGet("messages/{chatId}")]
        public async Task GetMessages(int chatId)
        {
            List<Message> chatMessages = new List<Message>();
            if (chatId == 0) { 
                chatMessages = await _context.Messages.ToListAsync();
            }
            else
            {
                string activeChatSessionsKey = "activechats";
                List<Chat> activeChatSessions;
                if (_memoryCache.TryGetValue(activeChatSessionsKey, out activeChatSessions))
                {
                    Chat currentChat = activeChatSessions.Find((newChat) => newChat.chatId == chatId);
                    
                    if (currentChat != null)
                    {
                        chatMessages = currentChat.messages;
                    }
                }

            }

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
            return message.body;
        }
        [HttpPost("sendprivatemessage/{chatId}")]
        public void SendMessage(Message message, int chatId)
        {

            string activeChatSessionsKey = "activechats";
            List<Chat> activeChatSessions;
            if (_memoryCache.TryGetValue(activeChatSessionsKey, out activeChatSessions))
            {
                activeChatSessions.Find((newChat) => newChat.chatId == chatId)
                    .messages.Add(message);
                _memoryCache.Set(activeChatSessionsKey, activeChatSessions);
            }
           
        
           
        }

        /*[HttpGet("messages/{page}")]
        public async Task<ActionResult<MessageResponse>> GetMessagesPagination(int page)
        {
            
            var pageResults = 3f;

            var messages = await _context.Messages.Skip((page - 1) * (int)pageResults).Take((int)pageResults).ToListAsync();
            
            var messageResponse = new MessageResponse();
            
            messageResponse.Messages = messages;
            messageResponse.CurrentPage = page;
            
            return messageResponse;

        }*/
    }
}

