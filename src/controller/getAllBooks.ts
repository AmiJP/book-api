import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { Like } from "typeorm";

export async function getAllBooks(
  offset: number,
  count: number,
  title: string
) {
  const bookRepository = AppDataSource.getRepository(Book);

  if (!title) {
    const books = await bookRepository.find({
      skip: offset ? offset : null,
      take: count ? count : null,
    });

    return {
      status: 200,
      data: books,
    };
  }

  const books = await bookRepository.find({
    where: {
      title: Like(`%${title}%`),
    },
    skip: offset ? offset : null,
    take: count ? count : null,
  });

  return {
    status: 200,
    data: books,
  };
}
