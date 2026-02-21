import { Router } from "express";
import { User } from "../db.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const router = Router();
const JWT_SECRET = env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const user = await User.create({
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

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
    password,
  });
  if (!user) {
    return res.json({ message: "User not found" });
  }
  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({
    message: "Signed in successfully!",
    token,
  });
});

export default router;
