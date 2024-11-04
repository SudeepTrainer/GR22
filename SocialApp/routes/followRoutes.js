import express from "express";
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
  updateFollowStatus,
} from "../controllers/followController.js";

const followRouter = express.Router();
followRouter.post("/request", followUser);
followRouter.post("/approve", updateFollowStatus);
followRouter.post("/unfriend", unfollowUser);
followRouter.get("/followers/:id", getFollowers);
followRouter.get("/following/:id", getFollowing);

export default followRouter;
