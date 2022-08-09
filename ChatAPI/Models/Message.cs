namespace ChatAPI.Models
{
    public class Message
    {
        public int Id { get; set; }

        public string Body { get; set; } = string.Empty;

        public string? Username { get; set; }
        public DateTime? CreatedDate { get; set; }

        public int? ChatId { get; set; }

        public bool? IsDeleted { get; set; }


    }
}
