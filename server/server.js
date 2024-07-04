import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
const dbCString = process.env.DATABASE_URL;
export const database = new pg.Pool({
  connectionString: dbCString,
});

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
app.listen(port, () => {
  console.log(`Your server is running on port: ${port}`);
});
app.get("/", (req, res) => {
  res.json({ Message: "Root route wokring!" });
});

// STRETCH GOAL
//update
app.put("/updateformdata/:id", async (req, res) => {
  const dataId = req.params.id;
  const result = await database.query(
    `
  UPDATE tablename set column_name = $1, second_column = $2 WHERE id = $3 RETURNING *`,
    [data_one, data_two, dataId]
  );
  res.json(result.rows);
});
//delete
app.delete("/deleteformdata/:id", async (req, res) => {
  const dataId = rreq.param.id;
  const result = await database.query(
    `
  DELETE FROM table_name WHERE id = $1 RETURNING *
  `,
    [dataId]
  );
  res.json(result.rows);
});
