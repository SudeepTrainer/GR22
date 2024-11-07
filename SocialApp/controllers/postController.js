import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
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
// single post
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

// new post
export const createPost = async (req, res) => {
  const { title, content, authorid } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorid: parseInt(authorid),
      },
    });
    if (post) {
      res.status(201).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: "Post not created" });
  }
};
// update post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedPost = await prisma.post.update({
    where: { id: parseInt(id) },
    data: {
      title,
      content,
    },
  });
  res.status(200).json(updatedPost);
  try {
  } catch (error) {
    console.log(error);
    res.status(501).json({ status: "Post not updated" });
  }
};
