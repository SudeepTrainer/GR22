const express = require("express");
const connectDb = require("./db/connect");
require("dotenv").config();
const router = require("./routes/todo");
const notfound = require("./middleware/notfound");
const errorHandler = require("./middleware/CutomErrorHandler");
const cors = require("cors");

const PORT = 5000;

const app = express();
// middleware
// to allow cross origin requests
app.use(cors());
// for handling json data coming in post request 
app.use(express.json());
// all the requests with go to router
app.use("/api/v1/todos", router);
// invalid requests 404
app.use(notfound);
// custom error handling
app.use(errorHandler);

const start = async () => {
  try {
    // DB_URL is an env var
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


