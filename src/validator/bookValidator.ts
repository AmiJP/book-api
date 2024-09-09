import { body,param } from "express-validator";

export const createBookValidator = [
  body("title").notEmpty().withMessage("title is require"),
  body("author").notEmpty().withMessage("author is require"),
  body("genre").notEmpty().withMessage("genre is require"),
  body("publishedYear")
    .notEmpty()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Published year must be a valid year"),
];

export const getBookValidator = [
    param("id")
      .notEmpty()
      .withMessage("ID is required")
      .isInt()
      .withMessage("ID must be a valid integer"),
  ];

  export const deleteBookValidator = [
    param("id")
      .notEmpty()
      .withMessage("ID is required")
      .isInt()
      .withMessage("ID must be a valid integer"),
  ];

  export const updateBookValidator = [
    // Validate 'id' parameter
    param("id")
      .notEmpty()
      .withMessage("ID is required")
      .isInt()
      .withMessage("ID must be a valid integer"),
  
    // Validate 'title' field
    body("title")
      .notEmpty()
      .withMessage("Title is required"),
  
    // Validate 'author' field
    body("author")
      .notEmpty()
      .withMessage("Author is required"),
  
    // Validate 'genre' field
    body("genre")
      .notEmpty()
      .withMessage("Genre is required"),
  
    // Validate 'publishedYear' field
    body("publishedYear")
      .notEmpty()
      .withMessage("Published year is required")
      .isInt({ min: 1000, max: new Date().getFullYear() })
      .withMessage("Published year must be a valid year"),
  ];