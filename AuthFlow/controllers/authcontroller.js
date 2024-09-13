import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import crypto from "crypto";

// const users = [];

const generateSessionID = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const createUser = async (req, res) => {
  // get the username and password
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  //   users.push({
  //     username,
  //     password: hashedPassword,
  //   });
  await UserModel.create({ username, password: hashedPassword });
  res.send("User created");
};

export const verifyUser = async (req, res) => {
  const { username, password } = req.body;
  // check username
  //   const user = users.find((user) => user.username === username);
  const user = await UserModel.findOne({ username });
  console.log(user);
  if (!user) {
    res.status(200).send("User not found");
    return;
  }
  console.log(password, user.password);
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.status(200).send("Incorrect password");
    return;
  }
  const sessionID = generateSessionID();
  console.log(sessionID);

  // httpOnly is for preventing XSS(cross site scripting) attacks.
  res.cookie("sessionToken", sessionID, { maxAge: 3600000, httpOnly: true });

  res.send(`Welcome ${username}`);
};
