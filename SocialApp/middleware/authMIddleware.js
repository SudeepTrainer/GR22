import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const REFRESH_SECRET = process.env.JWT_REFRESH_KEY;

export const generateToken = (user) => {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      userName: user.userName,
    },
    JWT_SECRET,
    {
      expiresIn: "2m",
    }
  );
  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },
    REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
