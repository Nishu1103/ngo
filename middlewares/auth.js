import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';
import ErrorHandler from './error.js';
import { catchASyncError } from './catchASyncError.js';

export const isAuthorized = catchASyncError(async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return next(new ErrorHandler('Not authenticated', 401));
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        err.statusCode = 500;
        return next(new ErrorHandler('Token is not valid', 500));
    }

    if (!decodedToken) {
        return next(new ErrorHandler('Not authenticated', 401));
    }

    req.user = await User.findById(decodedToken.id);
    if (!req.user) {
        return next(new ErrorHandler('User not found', 404));
    }

    next();
});
