import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.user.findMany({
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
    if (posts) {
      res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: "Posts not fetched" });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
    if (post) {
      res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: "Post not fetched" });
  }
};

export const createPost = async (req, res) => {
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
