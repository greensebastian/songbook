namespace Songbook.Core;

public class Song
{
    public required string Id { get; init; }

    public required string Title { get; set; }

    public required string Lyrics { get; set; }

    public required string CategoryId { get; set; }

    public string? Origin { get; set; }

    
}
