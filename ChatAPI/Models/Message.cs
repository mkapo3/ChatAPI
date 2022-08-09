namespace ChatAPI.Models
{
    public class Message
    {
        public int Id { get; set; }

        public string? Body { get; set; }

        public int? SenderId { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? ChatId { get; set; }

    }
}
