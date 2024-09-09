import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

export async function getBook(id: number) {
  const bookRepository = AppDataSource.getRepository(Book);
  const result = await bookRepository.findOneBy({
    id: id,
  });

  if (!result) {
    return {
      status: 404,
      data: null,
    };
  }

  return {
    status: 200,
    data: result,
  };
}
