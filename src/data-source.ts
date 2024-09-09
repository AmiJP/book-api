import "reflect-metadata"
import { DataSource } from "typeorm"
import { Book } from "./entity/Book"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "your username",
    password: "your password",
    database: "bookdb",
    synchronize: true,
    logging: false,
    entities: [Book],
})



