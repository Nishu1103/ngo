import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
// const path = require('path');
import session from "express-session";
// const session = require('express-session');
import flash from "connect-flash"
// const flash = require('connect-flash');
import useRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import agentRouter from "./routes/agentRouter.js";
import donerRouter from "./routes/donerRouter.js";
import dbConnection from "./database/dbconnection.js";
import ErrorHandler from "./middlewares/error.js";
import errorMiddleware from "./middlewares/error.js";
import expressLayouts from "express-ejs-layouts";
const PORT = process.env.PORT || 4000;
const app = express();
dotenv.config({ path: "./config/config.env " });

app.get("/", (req, res) => {
  res.send("Hello World");
});
// app.set('view engine', 'ejs');
// // app.set('views', path.join(__dirname, ''));
// app.use(express.json());
// app.use(
//   cors({
//     method: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(cors());

app.options("*", cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", useRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/agent", agentRouter);
app.use("/api/v1/doner", donerRouter);

dbConnection();
app.use(ErrorHandler);
app.use(errorMiddleware);

export default app;
