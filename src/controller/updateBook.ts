import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

export async function updateBook(
  id: number,
  title: string,
  author: string,
  genre: string,
  publishedYear: number
) {
  const bookRepository = AppDataSource.getRepository(Book);
  let bookUpdate = await bookRepository.findOneBy({
    id: id,
  });

  console.log("database", bookUpdate);
  if (!bookUpdate) {
    return {
      status: 404,
      data:null
    };
  }

  bookUpdate.title = title ? title : bookUpdate.title;
  bookUpdate.author = author ? author : bookUpdate.author;
  bookUpdate.genre = genre ? genre : bookUpdate.genre;
  bookUpdate.publishedYear = publishedYear
    ? publishedYear
    : bookUpdate.publishedYear;

  let result = await bookRepository.save(bookUpdate);

  return {
    status: 200,
    data: {
      title: result.title,
      author: result.author,
      genre: result.genre,
      publishedYear: result.publishedYear,
    },
  };
}
