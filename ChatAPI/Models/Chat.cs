namespace ChatAPI.Models
{
    public class Chat
    {   
        public int chatId { get; set; }
        public User senderUser { get; set; }
        public User recipientUser { get; set; }

        public List<Message> messages { get; set; } = new List<Message>();

    }
}
