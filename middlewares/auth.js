import { catchASyncError } from "./catchASyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const isAuthorized = catchASyncError(async (req, res, next) => {
    const { token } = req.cookies;
    console.log("token",token)
    if (!token) {
        return next(new ErrorHandler("User not authenticated.", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    next();
});
