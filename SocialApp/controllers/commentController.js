import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// get all comments for the post
export const getAllCommentsByPost = async (req, res) => {
  try {
    /* 
        postId:1234
    } */
    const { id } = req.params;
    const comments = await prisma.comment.findMany({
      where: { postid: parseInt(id) },
      include: { user: true, likes: true },
    });
    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Internal server error" });
  }
};
// create comment
/*
{
    "content":"This si a sample comment",
    "postid":1323,
    userid:3
}
*/
export const createComment = async (req, res) => {
  try {
    const { content, postid, userid } = req.body;
    const newComment = await prisma.comment.create({
      data: {
        content,
        postid: parseInt(postid),
        userid: parseInt(userid),
      },
    });
    res.json(newComment);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Internal server error" });
  }
};
// delete comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Internal server error" });
  }
};
