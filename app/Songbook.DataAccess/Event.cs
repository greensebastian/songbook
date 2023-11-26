namespace Songbook.DataAccess;

public record Event(string Id, string StreamId, string StreamType, int IndexInStream, DateTimeOffset Created, string Data);