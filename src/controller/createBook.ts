
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

export async function createBook(
  title: string,
  author: string,
  genre: string,
  publishedYear: number
) {
  const book = new Book();
  book.title = title;
  book.author = author;
  book.genre = genre;
  book.publishedYear = publishedYear;

  const newBook = await AppDataSource.manager.save(book); 


  return {
    status:200,
    data: {
      title: newBook.title,
      author: newBook.author,
      genre: newBook.genre,
      publishedYear: newBook.publishedYear,
    },
  };
}
