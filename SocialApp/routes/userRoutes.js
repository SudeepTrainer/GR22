import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";

const userRouter = express.Router();
// get all users
userRouter.get("/", getAllUsers);
// get single user
userRouter.get("/:id", getSingleUser);
//create user
userRouter.post("/", createUser);
// update user
userRouter.put("/:id", updateUser);
// delete user
userRouter.delete("/:id", deleteUser);
export default userRouter;
