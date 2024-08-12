const express = require("express");
const CustomError = require("../error/customerror");
const app = express();
app.use(middleware2);
app.use(middleware1);
app.use(errorHandler);
function middleware1(req, res, next) {
  console.log("Middleware 1 called");
  next();
}
function middleware2(req, res, next) {
  console.log("Middleware 2 called");
  const error = new CustomError("one more error", 404);
  next(error);
}

// this will be called when an error is thrown
function errorHandler(err, req, res, next) {
  console.log(err.message);
  console.log(err.statuscode);
  res.send("Error occured");
}
app.get("/test", (req, res) => {
  console.log("routing method called");
  res.send("middleware log");
});
app.get("/contactus", middleware2, (req, res) => {
  console.log("routing method called");
  res.send("middleware log");
});

app.listen(8000, () => {
  console.log(`server running on port 8000`);
});
