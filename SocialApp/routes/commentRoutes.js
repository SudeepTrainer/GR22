import express from "express";
import {
  createComment,
  getAllCommentsByPost,
  deleteComment,
} from "../controllers/commentController.js";

const commentsRouter = express.Router();
// get all comments
commentsRouter.get("/:id", getAllCommentsByPost);
//create comment
commentsRouter.post("/", createComment);
// delete comment
commentsRouter.delete("/:id", deleteComment);
export default commentsRouter;
