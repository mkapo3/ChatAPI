namespace ChatAPI.Models
{
    public class Message
    {
        public int id { get; set; }

        public string body { get; set; } = string.Empty;

        public string? username { get; set; }
        public DateTime? createdDate { get; set; }

        public int? chatId { get; set; }

        public bool? isDeleted { get; set; }


    }
}
