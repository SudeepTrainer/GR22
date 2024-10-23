import express from "express";
import {
  createUser,
  getAllUsers,
  getSingleUser,
} from "../controllers/userController.js";

const userRouter = express.Router();
// get all users
userRouter.get("/", getAllUsers);
// get single user
userRouter.get("/:id", getSingleUser);
//create user
userRouter.post("/", createUser);

export default userRouter;
