import express from "express";
import mainRouter from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use("/api/v1", mainRouter);
