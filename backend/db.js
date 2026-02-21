import mongoose from "mongoose";
import { env } from "./config/env.js";

const mongoUrl = env.MONGO_URL;

mongoose.connect(mongoUrl);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
export const Account = mongoose.model("Account", accountSchema);
