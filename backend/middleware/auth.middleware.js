import jwt from "jsonwebtoken";
import { env } from "../config/env";

const JWT_SECRET = env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  req.userId = decoded.userId;
  next();
};

export default authMiddleware;
