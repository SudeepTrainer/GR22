import express from "express";
import mongoose from "mongoose";
import router from "./routes/authroute.js";
import cookieParser from "cookie-parser";

const app = express();
//middleware
app.use(express.json());
// parses the cookie header and populates req.cookies
app.use(cookieParser());
app.use(router);
app.listen(3000, async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/auth");
  console.log(`server running on port 3000`);
});

// const password = "12345";

// const salt = await bcrypt.genSalt();
// console.log(salt);
// // const hashedPassword = await bcrypt.hash(password, salt);
// // console.log(hashedPassword);
// console.time("hash");
// const hashedPassword = await bcrypt.hash(password, 10);
// console.log(hashedPassword);
// console.timeEnd("hash");

// const isValid = await bcrypt.compare("12345", hashedPassword);
// console.log(isValid);
