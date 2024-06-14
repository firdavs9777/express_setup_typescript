"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.deleteUser = exports.updateUserProfile = exports.updateUser = exports.getUserById = exports.getUsers = exports.logoutUser = exports.registerUser = exports.loginUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
console.log(jsonwebtoken_1.default);
// @desc: Auth User & get token
// @route Post /api/v1/users/login
// @access: Public
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await users_1.default.findOne({ email });
        if (user && user.matchPassword) {
            const passwordMatched = await user.matchPassword(password);
            if (passwordMatched) {
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
                    expiresIn: '30d',
                });
                res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
                });
                const responseData = {
                    name: user.name,
                    token: token,
                    message: 'success'
                };
                res.json(responseData);
                console.log(responseData);
                return;
            }
        }
        res.status(401);
        throw new Error('Error happened above api link');
    }
    catch (error) {
        res.status(401);
        throw new Error(error.message);
    }
};
exports.loginUser = loginUser;
// @desc: Register User
// @route Post /api/v1/users/register
// @access: Public
const registerUser = async (req, res, next) => {
    // const users = await User.find({});
    // res.send('Register User');
    // res.json(users);
    const { name, email, password } = req.body;
    try {
        const userExists = await users_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const user = await users_1.default.create({ name, email, password });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            });
            const responseData = {
                data: user,
                token: token,
                message: 'User registered successfully'
            };
            res.status(201).json(responseData);
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.registerUser = registerUser;
// @desc: Logout User
// @route Post /api/v1/users/logout
// @access: Private
const logoutUser = async (req, res, next) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logoutUser = logoutUser;
// @desc: Get User Profile
// @route Post /api/v1/users/profile
// @access: Private
const getUserProfile = async (req, res, next) => {
    try {
        const user = await users_1.default.findById(req.user._id);
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            });
        }
        else {
            res.status(401);
            throw new Error('Error happened above api link');
        }
    }
    catch (error) {
        res.status(401);
        throw new Error(error.message);
    }
};
exports.getUserProfile = getUserProfile;
// @desc: Update User Profile
// @route Put /api/v1/users/profile
// @access: Private
const updateUserProfile = async (req, res, next) => {
    try {
        const user = await users_1.default.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }
            const updateUser = await user.save();
            res.status(200).json({
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin
            });
        }
        else {
            res.status(401);
            throw new Error('Error happened above api link');
        }
    }
    catch (error) {
        res.status(401);
        throw new Error(error.message);
    }
};
exports.updateUserProfile = updateUserProfile;
// @desc: Get Users
// @route Get /api/v1/users
// @access: Private/Admin
const getUsers = async (req, res, next) => {
    try {
        const users = await users_1.default.find();
        const responseData = {
            count: users.length,
            data: users,
            message: 'success'
        };
        res.json(responseData);
        return;
    }
    catch (error) {
        res.status(401);
        throw new Error(error);
    }
};
exports.getUsers = getUsers;
// @desc: Get User by ID  
// @route Get /api/v1/users/:id
// @access: Private/Admin
const getUserById = async (req, res, next) => {
    const users = await users_1.default.find({});
    res.send('Get User By Idd');
    res.json(users);
};
exports.getUserById = getUserById;
// @desc: Delete single user by id
// @route DELETE /api/v1/users/:id
// @access: Private/Admin
const deleteUser = async (req, res, next) => {
    res.send('Delete Users');
};
exports.deleteUser = deleteUser;
// @desc: Update single user by id
// @route PUT /api/v1/users/:id
// @access: Private/Admin
const updateUser = async (req, res, next) => {
    res.send('Delete Users');
};
exports.updateUser = updateUser;
