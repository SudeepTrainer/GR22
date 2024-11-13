import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET_KEY = process.env.ACCESS_SECRET_KEY;
const PORT = 3100;
const app = express();
app.use(express.json());
const users = []; // mock data
//helper function to create JWT
function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
    algorithm: "HS512",
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

app.post("/login", (req, res) => {
  console.log(req.body.username);
  // after authenticating code
  const token = generateToken({ userid: 1234, username: req.body.username });
  res.json({ "Access Token": token });
});
// protected route
app.get("/home", authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
