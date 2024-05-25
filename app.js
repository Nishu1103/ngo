import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import useRouter from "./routes/userRouter.js";
import dbConnection from "./database/dbconnection.js";
import ErrorHandler from "./middlewares/error.js";
import errorMiddleware from "./middlewares/error.js";
const PORT = process.env.PORT || 4000;
const app = express();
dotenv.config({ path: "./config/config.env " });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(
  cors({
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", useRouter);

dbConnection();
app.use(ErrorHandler);
app.use(errorMiddleware);

export default app;
