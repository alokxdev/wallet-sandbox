import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

export const User = mongoose.model("User", userSchema);
