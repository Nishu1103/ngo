import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';
import ErrorHandler from './error.js';
import { catchASyncError } from './catchASyncError.js';

export const isAuthorized = catchASyncError(async (req, res, next) => {
    const authHeader = req.get('Authorization');

    // Check for the 'Authorization' header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ErrorHandler('Not authenticated', 401));
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return next(new ErrorHandler('Token is not valid', 401));
    }

    // Check if the token is decoded properly
    if (!decodedToken || !decodedToken.id) {
        return next(new ErrorHandler('Not authenticated', 401));
    }

    // Find the user by ID from the decoded token
    const user = await User.findById(decodedToken.id);
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    req.user = user; // Attach the user object to the request
    next();
});
