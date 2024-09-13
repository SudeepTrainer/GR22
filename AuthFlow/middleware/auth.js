const authMiddlware = (req, res, next) => {
  console.log(req.cookies);
  const sessionToken = req.cookies.sessionToken;
  if (!sessionToken) {
    res.status(401).send("You are not authenticated");
    return;
  }
  next();
};
export default authMiddlware;
