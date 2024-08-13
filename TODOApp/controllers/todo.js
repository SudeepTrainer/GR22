const TodoModel = require("../model/ToDo");
const asyncWrapper = require("../utils/AsyncWrapper");
const CustomError = require("../error/customerror");
const getSingleToDo = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  // fetch data from db
  const Todo = await TodoModel.findById(id);
  if (!Todo) {
    // res.status(404).json("Not found");
    next(new CustomError(`${id} not found`, 404));
  }
  res.status(200).json({ message: Todo });
});

const getAllTodos = asyncWrapper(async (req, res) => {
  // get all the todos from DB
  const todos = await TodoModel.find({});
  console.log(todos);
  res.status(200).json({ message: todos });
});

const createToDo = asyncWrapper(async (req, res, next) => {
  const ToDo = await TodoModel.create(req.body);
  if (!ToDo) {
    next(new CustomError(`Couldn't create todo`, 404));
  }
  // add to db
  res.status(201).json({ message: ToDo });
});

const deleteToDo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  // delete the todo in db for given id
  const deletedTodo = await TodoModel.findByIdAndDelete(id);
  if (!deletedTodo) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "TODO deleted" });
});

const updateToDo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedToDo = await ToDoModel.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  if (!updatedData) {
    res.status(404).json({ message: "not found" });
  }
  // update the todo having this id with data from body
  res.status(200).json({ message: updatedToDo });
});

module.exports = {
  getSingleToDo,
  getAllTodos,
  createToDo,
  deleteToDo,
  updateToDo,
};
