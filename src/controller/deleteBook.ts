import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

export async function deleteBook(id: number) {
  const bookRepository = AppDataSource.getRepository(Book);
  const bookToRemove = await bookRepository.findOneBy({
    id: id,
  });

  if (!bookToRemove) {
    return {
      status: 404,
      data: {
        message: "book not found",
      },
    };
  }

  await bookRepository.remove(bookToRemove);

  return {
    status: 200,
    data: {
      message: "book deleted successfully",
    },
  };
}
