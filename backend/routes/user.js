import { Router } from "express";
import { User } from "../db";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const router = Router();
const JWT_SECRET = env.JWT_SECRET;

router.use("signup", (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const user = User.create({
    username,
    password,
    firstName,
    lastName,
  });
  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({
    message: "User created successfully!",
    token,
  });
});
router.use("signin");

export default router;
