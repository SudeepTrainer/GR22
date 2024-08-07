const { default: mongoose } = require("mongoose");

// const connectDb = () => {
//   mongoose
//     .connect("mongodb://localhost:27017/tododb")
//     // .then((result) => {
//     //   console.log("Database connected ");
//     // })
//     // .catch((err) => {
//     //   console.error(err);
//     // });
// };

const connectDB = (url) => {
  mongoose.connect(url);
};

module.exports = connectDB;
