import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import surveyRoutes from "./routes/survey.routes.js";
import connectToMongoDB from "./DB/connectToMongoDb.js";
import questionRoutes from "./routes/question.routes.js";
import responseRoutes from "./routes/response.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/survey", surveyRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/responses", responseRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
