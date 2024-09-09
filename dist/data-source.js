"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Book_1 = require("./entity/Book");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "9978225367",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [Book_1.Book],
});
//# sourceMappingURL=data-source.js.map