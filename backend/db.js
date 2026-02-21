import mongoose from "mongoose";
import { env } from "./config/env";

const mongoUrl = env.MONGO_URL;

mongoose.connect(mongoUrl);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

export const User = mongoose.model("User", userSchema);
