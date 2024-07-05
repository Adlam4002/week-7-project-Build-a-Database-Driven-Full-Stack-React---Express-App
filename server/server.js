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
const port = 8081;
app.listen(port, () => {
  console.log(`Your server is running on port: ${port}`);
});
app.get("/", (req, res) => {
  res.json({ Message: "Root route wokring!" });
});
app.get("/review-list", async (req, res) => {
  const result = await database.query(`
    SELECT review_id, username, comment, anime_name, score FROM Anime_reviews
    `);
  res.json(result.rows);
});
app.get("/anime-list", async (req, res) => {
  const result = await database.query(`
    SELECT * FROM anime_list
    `);
  res.json(result.rows);
});
app.post("/newreview", async (req, res) => {
  const { username, comment, anime_name, score } = req.body;
  try {
    await database.query(
      `
    INSERT INTO Anime_reviews (Username, comment, anime_name, score)
    VALUES ($1, $2, $3, $4)
    `,
      [username, comment, anime_name, score]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("You have failed, my child", error);
    res.status(500).json({ success: false });
  }
});
app.post("/newanime", async (req, res) => {
  const { anime_name } = req.body;
  try {
    await database.query(
      `
    INSERT INTO Anime_list (anime_name)
    VALUES ($1)
    `,
      [anime_name]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("You have failed, my child", error);
    res.status(500).json({ success: false });
  }
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
  const dataId = req.param.id;
  const result = await database.query(
    `
  DELETE FROM table_name WHERE id = $1 RETURNING *
  `,
    [dataId]
  );
  res.json(result.rows);
});
