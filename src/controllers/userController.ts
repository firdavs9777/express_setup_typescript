import { RequestHandler } from "express";
import User from '../models/users';
interface DataType<T> {
    data: T;
    message: string;
    count?: number;
}

// @desc: Auth User & get token
// @route Post /api/v1/users/login
// @access: Public

const loginUser: RequestHandler = async (req, res, next) => {
  const users = await User.find({});
  res.send('Auth User');
  res.json(users);
};

// @desc: Register User
// @route Post /api/v1/users/register
// @access: Public

const registerUser: RequestHandler = async (req, res, next) => {
  const users = await User.find({});
  res.send('Register User');
  res.json(users);
};


// @desc: Logout User
// @route Post /api/v1/users/logout
// @access: Private

const logoutUser: RequestHandler = async (req, res, next) => {
  const users = await User.find({});
  res.send('Logout User');
  res.json(users);
};

// @desc: Get User Profile
// @route Post /api/v1/users/profile
// @access: Private

const getUserProfile: RequestHandler = async (req, res, next) => {
  const users = await User.find({});
  res.send('Get User Profile');
  res.json(users);
};

// @desc: Update User Profile
// @route Put /api/v1/users/profile
// @access: Private

const updateUserProfile: RequestHandler = async (req, res, next) => {
  const users = await User.find({});
  res.send('Get User Profile');
  res.json(users);
};

// @desc: Get Users
// @route Get /api/v1/users
// @access: Private/Admin

const getUsers: RequestHandler = async (req, res, next) => {
  const users = await User.find({});
  res.send('Get User Profile');
  res.json(users);
};

// @desc: Get User by ID  
// @route Get /api/v1/users/:id
// @access: Private/Admin

const getUserById: RequestHandler = async (req, res, next) => {
  const users = await User.find({});
  res.send('Get User By Id');
  res.json(users);
};

// @desc: Delete single user by id
// @route DELETE /api/v1/users/:id
// @access: Private/Admin

const deleteUser: RequestHandler = async (req, res, next) => {
  res.send('Delete Users');
};


// @desc: Update single user by id
// @route PUT /api/v1/users/:id
// @access: Private/Admin

const updateUser: RequestHandler = async (req, res, next) => {
  res.send('Delete Users');
};

export {loginUser,registerUser,logoutUser,getUsers,getUserById, updateUser,updateUserProfile,deleteUser,getUserProfile}