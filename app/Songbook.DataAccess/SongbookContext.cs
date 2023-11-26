using Microsoft.EntityFrameworkCore;

namespace Songbook.DataAccess;

public class SongbookContext(DbContextOptions<SongbookContext> options) : DbContext(options)
{
    public DbSet<Event> Events { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
