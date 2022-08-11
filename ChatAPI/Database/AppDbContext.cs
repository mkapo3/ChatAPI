using ChatAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatAPI.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Message>().HasData(
                    new Message { id = 1, body = "Prva poruka", username="PrviKorisnik", chatId=1, isDeleted=false }
                );
            modelBuilder.Entity<Message>().HasData(
                    new Message { id = 2, body = "Druga poruka", username = "DrugiKorisnik", chatId = 1, isDeleted = false }
                );
            modelBuilder.Entity<Message>().HasData(
                    new Message { id = 3, body = "Treca poruka", username = "TreciKorisnik", chatId = 1, isDeleted = false }
                );
            modelBuilder.Entity<Message>().HasData(
                    new Message { id = 4, body = "Cetvrta poruka", username = "Muharem", chatId = 1, isDeleted = false }
                );

        }
    }
}
