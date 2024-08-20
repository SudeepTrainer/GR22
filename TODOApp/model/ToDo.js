const mongoose = require("mongoose");
// creating the structure of the document
// defining the fields and their types
const ToDoSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
// model is an instance of the schema
const TodoModel = mongoose.model("ToDo", ToDoSchema);
module.exports = TodoModel;
