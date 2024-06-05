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
                    token: token,
                    message: 'success'
                };
                res.json(responseData);
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
    const users = await users_1.default.find({});
    res.send('Register User');
    res.json(users);
};
exports.registerUser = registerUser;
// @desc: Logout User
// @route Post /api/v1/users/logout
// @access: Private
const logoutUser = async (req, res, next) => {
    const users = await users_1.default.find({});
    res.send('Logout User');
    res.json(users);
};
exports.logoutUser = logoutUser;
// @desc: Get User Profile
// @route Post /api/v1/users/profile
// @access: Private
const getUserProfile = async (req, res, next) => {
    const users = await users_1.default.find({});
    res.send('Get User Profile');
    res.json('hello');
};
exports.getUserProfile = getUserProfile;
// @desc: Update User Profile
// @route Put /api/v1/users/profile
// @access: Private
const updateUserProfile = async (req, res, next) => {
    const users = await users_1.default.find({});
    res.send('Get User Profile');
    res.json(users);
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
    res.send('Get User By Id');
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
