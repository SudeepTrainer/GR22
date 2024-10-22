import express from "express";
import {
  createUser,
  getAllUsers,
  getSingleUser,
} from "../controllers/userController.js";

const router = express.Router();
// create a user
router.post("/", createUser);
// get all the users
router.get("/", getAllUsers);
// get single user
router.get("/:id", getSingleUser);

export default router;
