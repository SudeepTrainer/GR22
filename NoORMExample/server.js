import express from "express";
import client from "./db.js";

const app = express();
const PORT = 4000;
app.get("/createusers", async (req, res) => {
  try {
    const result = await client.query(
      `CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(50) NOT NULL
            )`
    );
    res.status(201).send("Table created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
