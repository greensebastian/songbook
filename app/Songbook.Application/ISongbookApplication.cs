using Songbook.Core;

namespace Songbook.Application;

public interface ISongbookApplication
{
    Task<Song> AddSong(CreateSongRequest request);

    Task<Category> AddCategory(CreateCategoryRequest request);

    Task<GetCategoriesResponse> GetCategories();
}
