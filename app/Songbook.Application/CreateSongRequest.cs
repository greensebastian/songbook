namespace Songbook.Application;

public record CreateSongRequest(string? Id, string Title, string Lyrics, string CategoryId, string? Origin, string? Melody);
