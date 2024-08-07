const mongoose = require("mongoose");
// creating the structure of the document
// defining the fields and their types
const ToDoSchema = new mongoose.Schema({
  createdOn: Date,
  title: String,
  description: String,
  completed: Boolean,
});
// model is an instance of the schema
const TodoModel = mongoose.model("ToDo", ToDoSchema);
module.exports = TodoModel;
