import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// like a comment or post
export const like = async (req, res) => {
  try {
    const { type, userid, postid, commentid } = req.body;
    const like = await prisma.like.create({
      data: {
        userid: parseInt(userid),
        postid: postid ? parseInt(postid) : null,
        commentid: commentid ? parseInt(commentid) : null,
        type: type || "LIKE",
      },
    });
    res.status(200).json(like);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Internal server error" });
  }
};
// unlike
export const unlike = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.like.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Unlike" });
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Internal server error" });
  }
};
