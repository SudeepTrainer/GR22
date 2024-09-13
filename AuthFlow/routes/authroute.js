import express from "express";
import { createUser, verifyUser } from "../controllers/authcontroller.js";

const router = express.Router();
router.post("/signup", createUser);
router.post("/login", verifyUser);

export default router;
