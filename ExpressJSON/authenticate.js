const authenticate = (req, res, next) => {
  const { uname, pswd } = req.query;
  if (uname === "mark" && pswd === "123") {
    next();
  } else {
    res.json({ message: "User is not authorized" });
  }
};
module.exports = authenticate;
