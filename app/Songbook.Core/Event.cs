namespace Songbook.Core;

public record Event(string Id, string StreamId, string StreamType, int IndexInStream, DateTimeOffset Created, IEventData Data);
