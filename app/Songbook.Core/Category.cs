namespace Songbook.Core;

public class Category(CategoryCreatedEventData data)
{
    public string Id { get; } = data.Id;

    public string Name { get; private set; } = data.Name;

    public string? Description { get; private set; } = data.Description;
}
