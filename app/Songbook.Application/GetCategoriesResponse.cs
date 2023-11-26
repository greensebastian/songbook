using Songbook.Core;

namespace Songbook.Application;

public class GetCategoriesResponse
{
    public required IList<GetCategoriesResponseItem> Items { get; init; }
}

public class GetCategoriesResponseItem
{
    public required Category Category { get; init; }
    public required IList<Song> Songs { get; init; }
}