"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
// User must be authenticated protect routes
const protect = async (req, res, next) => {
    let token;
    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;
    if (token) {
        try {
            //    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            // req.user = await User.findById((decoded as any).userId);
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            let test = await users_1.default.findById(decoded.userId).select('-password');
            req.user = test;
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};
exports.protect = protect;
// User must be an admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};
exports.admin = admin;
