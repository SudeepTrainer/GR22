import express from "express";
import { createUser, verifyUser } from "../controllers/authcontroller.js";
import authMiddlware from "../middleware/auth.js";

const router = express.Router();
router.post("/signup", createUser);
router.post("/login", verifyUser);
router.get("/profile", authMiddlware, (req, res) => {
  res.status(200).send("Profile can be edited");
});
router.get("/home", authMiddlware, (req, res) => {
  res.status(200).send("Home");
});

export default router;
