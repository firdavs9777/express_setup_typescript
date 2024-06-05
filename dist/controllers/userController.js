"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.deleteUser = exports.updateUserProfile = exports.updateUser = exports.getUserById = exports.getUsers = exports.logoutUser = exports.registerUser = exports.loginUser = void 0;
const users_1 = __importDefault(require("../models/users"));
// @desc: Auth User & get token
// @route Post /api/v1/users/login
// @access: Public
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await users_1.default.findOne({ email });
    if (user) {
        const responseData = {
            data: user,
            message: 'success'
        };
        res.json(responseData);
    }
    else {
        res.status(401);
        throw new Error('Error happened above api link');
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
