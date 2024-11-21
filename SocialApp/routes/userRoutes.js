import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  logout,
  refreshToken,
  updateUser,
} from "../controllers/userController.js";
import upload from "../config/multerConfig.js";
import { authenticateToken } from "../middleware/authMIddleware.js";
const userRouter = express.Router();
// get all users
userRouter.get("/", authenticateToken, getAllUsers);
// get single user
userRouter.get("/:id", getSingleUser);
//create user
userRouter.post("/", upload.single("avatar"), createUser);
// update user
userRouter.put("/:id", updateUser);
// delete user
userRouter.delete("/:id", deleteUser);
// login
userRouter.post("/login", loginUser);
userRouter.post("/logout", logout);

userRouter.post("/refreshToken", refreshToken);

export default userRouter;
