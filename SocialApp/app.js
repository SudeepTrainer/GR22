import express from "express";
import userRouter from "./routes/userRoutes.js";
import followRouter from "./routes/followRoutes.js";
import postsRouter from "./routes/postRoutes.js";
import commentsRouter from "./routes/commentRoutes.js";
const PORT = 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/follow", followRouter);
app.use("/post", postsRouter);
app.use("/comment", commentsRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
