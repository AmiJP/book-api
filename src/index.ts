import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { query, validationResult } from "express-validator";
//you can use try catch or express-async-errors to handle the error
import { AppDataSource } from "./data-source";
import { createBook } from "../src/controller/createBook";
import { getAllBooks } from "../src/controller/getAllBooks";
import { getBook } from "../src/controller/getBook";
import { deleteBook } from "../src/controller/deleteBook";
import { updateBook } from "../src/controller/updateBook";
import { errorHandler } from "../src/middleware/errorHandler";
import {
  createBookValidator,
  getBookValidator,
  updateBookValidator,
  deleteBookValidator
} from "../src/validator/bookValidator";

const app = express();
const port = 3000;
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

app.post("/books", createBookValidator, async (req: Request, res: Response) => {
  const error = validationResult(req);

  const { title, author, genre, publishedYear } = req.body;
  const result = await createBook(title, author, genre, publishedYear);
  if (error.isEmpty()) {
    return res.status(result.status).send(result.data);
  }
  return res.status(400).send({
    message: "validation error",
    error: error.array(),
  });
});

app.get("/books", async (req: Request, res: Response, next) => {
  try {
    let offset = req.query.offset as string | undefined;
    let count = req.query.count as string | undefined;
    let title = req.query.title as string | undefined;

    const result = await getAllBooks(+offset, +count, title);

    res.status(result.status).send(result.data);
  } catch (error) {
    next(error);
  }
});

app.get(
  "/books/:id",
  getBookValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    const id = +req.params.id;

    if (!error.isEmpty()) {
      return res.status(400).send({
        message: "validation error",
        error: error.array(),
      });
    }
    try {
      const result = await getBook(id);
      return res.status(result.status).send(result.data);
    } catch (err) {
      return next(err);
    }
  }
);

app.delete(
  "/books/:id",
  deleteBookValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);

    try {
      const id = +req.params.id;
      if (!error.isEmpty()) {
        return res.status(400).send({
          message: "validation error",
          error: error.array(),
        });
      }
      const result = await deleteBook(id);
      return res.status(result.status).send(result.data);
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/books/:id",
  updateBookValidator,
  async (req: Request, res: Response, next: NextFunction) => {
   
      let error = validationResult(req);
      const { title, author, genre, publishedYear } = req.body;
      const id = +req.params.id;
      

      if (!error.isEmpty()) {
        return res.status(400).send({
          message: "validation error",
          error: error.array(),
        });
      }
      try {
        const result = await updateBook(id, title, author, genre, publishedYear);
        return res.status(result.status).send(result.data);
      } catch (err) {
        next(err)
      }
  }
);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
