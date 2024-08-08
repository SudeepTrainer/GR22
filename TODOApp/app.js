const express = require("express");
const connectDb = require("./db/connect");
require("dotenv").config();
const TodoModel = require("./model/ToDo");
const PORT = 5000;

const app = express();
// middleware 
app.use(express.json());
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
  try {
    const ToDo = await TodoModel.create(req.body);
    if (!ToDo) {
      res.status(404).json({ message: "Couldn't create" });
    }
    // add to db
    res.status(201).json({ message: ToDo });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
// READ/ GET SINGLE TODO
app.get("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // fetch data from db
    const Todo = await TodoModel.findById(id);
    if (!Todo) {
      res.status(404).json("Not found");
    }
    res.status(200).json({ message: Todo });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
// UPDATE/ PATCH TODO
app.patch("/api/v1/todos/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  // update field for todo with given id
  res.status(200).json({ message: "TODO updated" });
});
// DELETE/ delete TODO
app.delete("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // delete the todo in db for given id
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "TODO deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
// GET ALL TODOS
app.get("/api/v1/todos", async (req, res) => {
  try {
    // get all the todos from DB
    const todos = await TodoModel.find({});
    console.log(todos);
    res.status(200).json({ message: todos });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
