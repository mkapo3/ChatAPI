using Microsoft.EntityFrameworkCore;

namespace ChatAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }

        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Message>().HasData(
                    new Message { Id = 1, Body = "Prva poruka" }
                );
            modelBuilder.Entity<Message>().HasData(
                    new Message { Id = 2, Body = "Druga poruka" }
                );
            modelBuilder.Entity<Message>().HasData(
                    new Message { Id = 3, Body = "Treca poruka" }
                );

        }
    }
}
