import bcrypt from "bcrypt";
import UserModel from "../models/user.js";

// const users = [];

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
  res.send(`Welcome ${username}`);
};
