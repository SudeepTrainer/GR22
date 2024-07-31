const express = require("express");
const { users } = require("./data");
const path = require("path");

const PORT = 5000;

const app = express();
// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// READ
app.get("/api/v1/users", (req, res) => {
  res.status(200).json(users);
});

app.post("/api/v1/users", (req, res) => {
  //   console.log(req.body);
  const { name } = req.body;
  // create the new user object
  // id for the new user
  const nextID = users.length ? users[users.length - 1].id + 1 : 1;
  const nextUser = { id: nextID, name: name };
  users.push(nextUser);
  res.json(nextUser);
});

app.delete("/api/v1/users/:id", (req, res) => {
  //   console.log(req.params);
  const { id } = req.params;
  const indexToDelete = users.findIndex((user) => {
    return user.id === Number(id);
  });
  const deletedUser = users.splice(indexToDelete, 1);
  res.json(deletedUser);
});

app.listen(PORT);
