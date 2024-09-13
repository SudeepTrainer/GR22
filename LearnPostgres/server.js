import express from "express";
import client from "./db.js";

const app = express();
app.use(express.json());
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

app.post("/adduser", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await client.query(
      `INSERT INTO users(name,email,password)
            VALUES($1,$2,$3) RETURNING *
            `,
      [name, email, password]
    );
    res.status(200).send(`${result} record created`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.listen(5000, () => {
  console.log("Server running");
});
