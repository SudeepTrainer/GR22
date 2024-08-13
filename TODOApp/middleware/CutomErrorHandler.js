const CustomError = require("../error/customerror");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    const statusCode = err.statuscode;
    const message = err.message;
    res.status(statusCode).json({ message });
  } else {
    res.status(500).send("There is an error from the server.");
  }
};
module.exports = errorHandler;
