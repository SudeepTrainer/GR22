const express = require("express");
const connectDb = require("./db/connect");
const PORT = 5000;

const app = express();
const start = async () => {
  try {
    await connectDb();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
// connectDb
//   .then(() => {
//     console.log("Database connected");
//     app.listen(PORT, () => {
//       console.log(`server running on ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
app.get("/", (req, res) => {
  res.json({ messsage: "API home" });
});
