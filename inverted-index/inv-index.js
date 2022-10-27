import { db } from "./index.js";
export default async function createIndexTable() {
  // await db.schema.dropTable("index");
  try {
    if (await db.schema.hasTable("index")) return;
    await db.schema.createTable("index", (table) => {
      table.string("word").primary();
      table.json("index");
    });
  } catch (error) {
    console.error(error);
  }
}
export const createIndexEntries = (data) => {
  data.forEach((entry) => {
    db("index")
      .insert({
        word: entry[0].toLowerCase(),
        index: JSON.stringify(entry[1]),
      })
      .then((res) => res)
      .catch((error) => console.error(error));
  });
};
