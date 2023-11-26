namespace Songbook.Core;

public record CategoryCreatedEventData(string Id, string Name, string? Description) : IEventData;
