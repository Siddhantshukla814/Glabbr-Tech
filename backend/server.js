import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); //body-parser (new version in-built express)

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/contacts", contactRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(5000, console.log("Server is started on port 5000"));
