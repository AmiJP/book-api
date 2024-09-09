"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("database connect");
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map