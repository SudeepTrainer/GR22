// import modules
const express = require("express");
const fs = require("fs");
const path = require("path");
//declare the port
const PORT = 5000;
// create the server
const app = express();

//middlewares
app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  next();
});

// static file handling
app.use("/static", express.static(path.join(__dirname, "public")));

// routing methods
app.get("/", (req, res) => {
  res.status(200).send("Text from backend");
});

app.get("/api/user", (req, res) => {
  const user = {
    name: "Sudeep",
    gender: "Male",
  };
  res.json(user);
});

app.get("/api/image", (req, res) => {
  const imagePath = path.join(__dirname, "statuscodes.png");
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(404).send("Image not sent");
    } else {
      res.status(200).type("png").send(data);
    }
  });
});

app.get("/api/html", (req, res) => {
  const htmlPath = path.join(__dirname, "contact.html");
  fs.readFile(htmlPath, (err, data) => {
    if (err) {
      res.status(404).send("HTML not sent");
    } else {
      res.status(200).type("html").send(data);
    }
  });
});

app.all("*", (req, res) => {
  res.send("Resource not found");
});
// run the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
