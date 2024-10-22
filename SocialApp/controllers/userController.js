import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password,
      },
    });
    console.log(user);
    if (user) {
      res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ Error: "User not created" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
    if (users) {
      res.status(201).json(users);
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ Error: "all Users not fetched" });
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
    console.log(user);
    if (user) {
      res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ Error: "User not fetched" });
  }
};
