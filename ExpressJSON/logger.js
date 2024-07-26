const { format } = require("date-fns");
const logger = (req, res, next) => {
  console.log(req.method);
  console.log(req.url);
  console.log(format(new Date(), "yyyy-MM-dd"));
  next();
};
module.exports = logger;
