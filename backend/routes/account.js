import express from "express";
import mongoose from "mongoose";
import authMiddleware from "../middleware/auth.middleware.js";
import { Account, User } from "../db.js";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    const user = await User.findOne({ _id: req.userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    res.json({
      user: user.firstName,
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { amount, to } = req.body;

    if (amount <= 0) {
      throw new Error("Invalid transfer amount");
    }

    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount) {
      throw new Error("Insufficient balance");
    }

    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);

    if (!toAccount) {
      throw new Error("Invalid account");
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } },
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } },
    ).session(session);

    await session.commitTransaction();

    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    await session.abortTransaction();

    res.status(400).json({
      message: error.message || "Transfer failed",
    });
  } finally {
    session.endSession();
  }
});

export default router;
