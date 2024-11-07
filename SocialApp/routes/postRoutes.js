import express from "express";
import {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../controllers/postController.js";

const postsRouter = express.Router();
// get all posts
postsRouter.get("/", getAllPosts);
// get single post
postsRouter.get("/:id", getSinglePost);
//create post
postsRouter.post("/", createPost);
// update post
postsRouter.put("/:id", updatePost);

export default postsRouter;
