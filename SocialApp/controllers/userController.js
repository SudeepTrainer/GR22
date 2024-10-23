import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        username,
        password,
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
