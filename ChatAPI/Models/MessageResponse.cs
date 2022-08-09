namespace ChatAPI.Models
{
    public class MessageResponse
    {
        public List<Message> Messages { get; set; } = new List<Message>();
        public int CurrentPage { get; set; }
    }
}
