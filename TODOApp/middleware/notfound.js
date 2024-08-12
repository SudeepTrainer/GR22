const notfound = (req, res) => {
  res.status(404).send("Nothing exists with this url");
};
module.exports = notfound;
