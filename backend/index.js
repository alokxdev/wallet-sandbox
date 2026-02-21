import express from "express";
import mainRouter from "./routes/index.js";
import cors from "cors";
import { env } from "./config/env.js";

const app = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
