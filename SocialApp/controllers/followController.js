import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const followUser = async (req, res) => {
  try {
    // following user id and followed user id
    const { followerId, followingId } = req.body;
    // check for existing follow record
    const exisitingFollow = await prisma.follow.findUnique({
      where: {
        // unique key created by prisma
        followerid_followingid: {
          followerid: followerId,
          followingid: followingId,
        },
      },
    });
    if (exisitingFollow) {
      res.status(400).json({ Error: "You are already following" });
    }
    // creating the new follow relation record
    const newFollow = await prisma.follow.create({
      data: {
        followerid: followerId,
        followingid: followingId,
      },
    });
    res.status(201).json({ Success: "Follow request sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateFollowStatus = async (req, res) => {
  try {
    // Follower user ID, Following user ID and relation status
    const { followerId, followingId, status } = req.body;
    // only accept if status is active or rejected
    if (!["ACTIVE", "REJECTED"].includes(status)) {
      return res
        .status(400)
        .json({ Status: "Status should be active or rejected" });
    }
    const updatedFollow = await prisma.follow.update({
      where: {
        // unique key created by prisma
        followerid_followingid: {
          followerid: followerId,
          followingid: followingId,
        },
      },
      data: {
        status: status,
      },
    });
    res.status(200).json({ Success: "Status changed", updatedFollow });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    // Follower user ID, Following user ID and relation status
    const { followerId, followingId } = req.body;
    // check for existing follow record
    const exisitingFollow = await prisma.follow.findUnique({
      where: {
        // unique key created by prisma
        followerid_followingid: {
          followerid: followerId,
          followingid: followingId,
        },
      },
    });
    if (!exisitingFollow || exisitingFollow.status != "ACTIVE") {
      return res.status(400).json({ Error: "Not folowing actively" });
    }

    await prisma.follow.delete({
      where: {
        // unique key created by prisma
        followerid_followingid: {
          followerid: followerId,
          followingid: followingId,
        },
      },
    });
    res.status(200).json({ Status: "Unfolowed succesfully" });
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Internal server error" });
  }
};

export const getFollowers = async (req, res) => {
  try {
    // user id for the folowers list
    const { id } = req.params;
    const followers = await prisma.follow.findMany({
      where: {
        followingid: parseInt(id),
        status: "ACTIVE",
      },
      include: { follower: true },
    });
    res.status(200).json(followers);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Internal server error" });
  }
};

export const getFollowing = async (req, res) => {
  try {
    // user id for the folowers list
    const { id } = req.params;
    const followers = await prisma.follow.findMany({
      where: {
        followerid: parseInt(id),
        status: "ACTIVE",
      },
      include: { following: true },
    });
    res.status(200).json(followers);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Internal server error" });
  }
};
