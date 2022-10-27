import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import knex from "knex";
import cors from "cors";
import createIndexTable, { createIndexEntries } from "./inv-index.js";
import createIndexJSON from "./json-index.js";

export const db = knex({
  client: "pg",
  connection: process.env.DB_CONNECTION,
  searchPath: ["knex", "public"],
});

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

db.raw("SELECT 1")
  .then((res) => console.log("Succesfully connected to database..."))
  .catch((error) => console.error(error));

app.get("/", async (req, res) => {
  const usersData = await db("mock_data");
  const index = createIndexJSON(usersData);
  createIndexTable();
  // createIndexEntries(index);

  const indexSQL = await db("index");
  console.log(indexSQL);
  res.json(index);
});

app.get("/:search", async (req, res) => {
  const indices = await db("index").where({ word: req.params.search });
  console.log(indices);
  res.json(indices);
});

app.listen(port, console.log(`Server running on http://localhost:${8080}`));
