import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/authMIddleware.js";
import jwt from "jsonwebtoken";

const REFRESH_SECRET = process.env.JWT_REFRESH_KEY;

const prisma = new PrismaClient();

const removeFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("File not deleted");
    } else {
      console.log("file was deleted");
    }
  });
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: "Users not fetched" });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: "User not fetched" });
  }
};

export const createUser = async (req, res) => {
  const { email, name, username, password } = req.body;
  // Upload an image
  console.log(req.file.path);
  const hashedPassword = await bcrypt.hash(password, 10);
  const uploadResult = await cloudinary.uploader
    .upload(req.file.path, {
      folder: "avatars",
      resource_type: "image",
    })
    .catch((error) => {
      console.log(error);
      removeFile(req.file.path);
    });

  console.log(uploadResult);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        username,
        password: hashedPassword,
        avatarUrl: uploadResult.secure_url,
      },
    });
    if (user) {
      res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: "User not created" });
  }
};
// update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, name, bio, avatarUrl } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, username, name, bio, avatarUrl },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: "User not updated" });
  }
};
// delete user

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: "User not deleted" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("username", username);

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(404).json({ message: "Password not matched" });
    // generate token
    const { accessToken, refreshToken } = generateToken(user);
    // create refresh token record
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    });

    res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: "Login failed" });
  }
};
// refresh token endpoint to issue a new access token

export const refreshToken = async (req, res) => {
  const { refreshtoken } = req.body;
  if (!refreshtoken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }
  try {
    const decoded = jwt.verify(refreshtoken, REFRESH_SECRET);
    if (isNaN(decoded.userId)) {
      return res.status(400).json({ message: "Invalid userid in token" });
    }
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshtoken },
    });
    console.log(tokenRecord);
    if (
      !tokenRecord ||
      tokenRecord.isRevoked ||
      tokenRecord.expiresAt < new Date()
    ) {
      return res
        .status(403)
        .json({ message: "Invalid refresh token or revoked" });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // generate access token
    const { accessToken, refreshToken } = generateToken(user);
    await prisma.refreshToken.update({
      where: { id: tokenRecord.id },
      data: {
        token: refreshToken,
        isRevoked: false,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(403).json({ status: "Refresh Token failed" });
  }
};

export const logout = async (req, res) => {
  const { refreshtoken } = req.body;
  if (!refreshtoken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }
  try {
    const decoded = jwt.verify(refreshtoken, REFRESH_SECRET);
    // check refresh token in db
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshtoken },
    });
    if (
      !tokenRecord ||
      tokenRecord.isRevoked ||
      tokenRecord.expiresAt < new Date()
    ) {
      return res
        .status(403)
        .json({ message: "Invalid refresh token or already revoked" });
    }
    // revoke the token
    await prisma.refreshToken.update({
      where: { token: refreshtoken },
      data: { isRevoked: true },
    });
    res.status(200).json({ messsage: "Logout success" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ status: "Logout failed" });
  }
};
