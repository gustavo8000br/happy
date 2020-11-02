import express from "express";
import path from "path";
import "express-async-errors";
import cors from "cors";
require("dotenv").config();

import "./database/conection";
import routes from "./routes";
import errorHandler from "./errors/handler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
let PORT = process.env["PORT"];
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

app.listen(PORT);