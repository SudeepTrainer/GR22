const express = require("express");
const connectDb = require("./db/connect");
require("dotenv").config();
const TodoModel = require("./model/ToDo");
const PORT = 5000;

const app = express();
const start = async () => {
  try {
    await connectDb(process.env.DB_URL);
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
app.get("/", (req, res) => {
  res.json({ messsage: "API home" });
});

// CREATE/POST TODO
app.post("/api/v1/todos", async (req, res) => {
  const { title, description, completed } = req.body;
  const ToDo = await TodoModel.create({
    title: title,
    description: description,
    completed: completed,
  });
  console.log(ToDo);
  // add to db
  res.status(201).json({ message: "TODO created" });
});
// READ/ GET SINGLE TODO
app.get("/api/v1/todos/:id", (req, res) => {
  const { id } = req.params;
  // fetch data from db
  res.status(200).json({ message: "TODO fetched" });
});
// UPDATE/ PATCH TODO
app.patch("/api/v1/todos/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  // update field for todo with given id
  res.status(200).json({ message: "TODO updated" });
});
// DELETE/ delete TODO
app.delete("/api/v1/todos/:id", (req, res) => {
  const { id } = req.params;
  // delete the todo in db for given id
  res.status(200).json({ message: "TODO deleted" });
});
// GET ALL TODOS
app.get("/api/v1/todos", (req, res) => {
  // get all the todos from DB
  res.status(200).json({ message: "ALL TODOS Fetched" });
});
