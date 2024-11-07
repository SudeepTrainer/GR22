import express from "express";
import { like, unlike } from "../controllers/likeController.js";

const likesRouter = express.Router();

// get single user
likesRouter.delete("/:id", unlike);
//create user
likesRouter.post("/", like);

export default likesRouter;
