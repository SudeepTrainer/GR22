import express from "express";
import {
  followUser,
  updateFollowStatus,
} from "../controllers/followController.js";

const followRouter = express.Router();
followRouter.post("/request", followUser);
followRouter.post("/approve", updateFollowStatus);
export default followRouter;
