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
                    new Message { Id = 1, Body = "Prva poruka", Username="PrviKorisnik", ChatId=1, IsDeleted=false }
                );
            modelBuilder.Entity<Message>().HasData(
                    new Message { Id = 2, Body = "Druga poruka", Username = "DrugiKorisnik", ChatId = 1, IsDeleted = false }
                );
            modelBuilder.Entity<Message>().HasData(
                    new Message { Id = 3, Body = "Treca poruka", Username = "TreciKorisnik", ChatId = 1, IsDeleted = false }
                );
            modelBuilder.Entity<Message>().HasData(
                    new Message { Id = 4, Body = "Cetvrta poruka", Username = "Muharem", ChatId = 1, IsDeleted = false }
                );

        }
    }
}
