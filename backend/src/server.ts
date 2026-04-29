import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/ai", aiRoutes);

app.listen(5000, () => {
  console.log("🚀 Server rodando na porta 5000");
});
