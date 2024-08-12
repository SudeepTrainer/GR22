const TodoModel = require("../model/ToDo");
const getSingleToDo = async (req, res) => {
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
};

const getAllTodos = async (req, res) => {
  try {
    // get all the todos from DB
    const todos = await TodoModel.find({});
    console.log(todos);
    res.status(200).json({ message: todos });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createToDo = async (req, res, next) => {
  try {
    const ToDo = await TodoModel.create(req.body);
    if (!ToDo) {
      res.status(404).json({ message: "Couldn't create" });
    }
    // add to db
    res.status(201).json({ message: ToDo });
  } catch (error) {
    next(error);
  }
};

const deleteToDo = async (req, res) => {
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
};

const updateToDo = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  // update field for todo with given id
  res.status(200).json({ message: "TODO updated" });
};

module.exports = {
  getSingleToDo,
  getAllTodos,
  createToDo,
  deleteToDo,
  updateToDo,
};
