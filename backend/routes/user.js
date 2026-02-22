import { Router } from "express";
import { User, Account } from "../db.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import authMiddleware from "../middleware/auth.middleware.js";

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
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
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

router.put("/", authMiddleware, async (req, res) => {
  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

export default router;
