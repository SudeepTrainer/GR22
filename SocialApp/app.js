import express from "express";
import userRouter from "./routes/userRoutes.js";
const PORT = 4000;
const app = express();

app.use(express.json());
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
