const express = require("express");
const connectDb = require("./db/connect");
require("dotenv").config();
const router = require("./routes/todo");
const notfound = require("./middleware/notfound");
const errorHandler = require("./middleware/CutomErrorHandler");

const PORT = 5000;

const app = express();
// middleware
app.use(express.json());
app.use("/api/v1/todos", router);
app.use(notfound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDb(process.env.DB_URL);
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
// app.get("/", (req, res) => {
//   res.json({ messsage: "API home" });
// });


