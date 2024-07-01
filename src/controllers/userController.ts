import { RequestHandler } from "express";
import User from '../models/users';
import jwt from 'jsonwebtoken';
import { env } from "process";
interface UserType {
  _id: string,
  name: string,
  email: string,
  password: string,
  isAdmin?: boolean,
  __v?: number,
  createdAt?: string,
  updatedAt?: string,
  matchPassword?: (arg1: string) => Promise<boolean>
  save: () => Promise<UserType>
}

interface DataType<T> {
  name?: string,
  data?: T | any;
  isAdmin?: boolean,
  token?: string;
  message: string;
  count?: number;
}


// @desc: Auth User & get token
// @route Post /api/v1/users/login
// @access: Public

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user: UserType | null = await User.findOne({ email });
    if (user && user.matchPassword) {
      const passwordMatched = await user.matchPassword(password);
      if (passwordMatched) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string,
          {
            expiresIn: '30d',
          });
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
        const responseData: DataType<UserType> = {
          name: user.name,
          isAdmin: user.isAdmin,
          token: token,
          message: 'success'
        };
        res.json(responseData);

        return;
      }
    }
    res.status(401);
    throw new Error('Error happened above api link');
  }
  catch (error: any) {
    res.status(401);
    throw new Error(error.message);
  }
};

// @desc: Register User
// @route Post /api/v1/users/register
// @access: Public

export const registerUser: RequestHandler = async (req, res, next) => {
  // const users = await User.find({});
  // res.send('Register User');
  // res.json(users);
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }
    const user = await User.create({ name, email, password });
    if (user) {
      const token: string = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
      });
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      })
      const responseData: DataType<UserType> = {
        data: user,
        token: token,

        message: 'User registered successfully'
      };
      res.status(201).json(responseData);
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


// @desc: Logout User
// @route Post /api/v1/users/logout
// @access: Private

export const logoutUser: RequestHandler = async (req, res, next) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc: Get User Profile
// @route Post /api/v1/users/profile
// @access: Private

export const getUserProfile: RequestHandler = async (req: any, res, next) => {
  try {
    const user: UserType | null = await User.findById(req.user._id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
      );

    }
    else {
      res.status(401);
      throw new Error('Error happened above api link');
    }
  }
  catch (error: any) {
    res.status(401);
    throw new Error(error.message);
  }

};

// @desc: Update User Profile
// @route Put /api/v1/users/profile
// @access: Private

export const updateUserProfile: RequestHandler = async (req: any, res, next) => {
  try {
    const user: UserType | null = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updateUser: UserType = await user.save();
      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin
      })
    }
    else {
      res.status(401);
      throw new Error('Error happened above api link');
    }
  }
  catch (error: any) {
    res.status(401);
    throw new Error(error.message);
  }
};

// @desc: Get Users
// @route Get /api/v1/users
// @access: Private/Admin

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users: UserType[] = await User.find();
    const responseData: DataType<UserType[]> = {
      count: users.length,
      data: users,
      message: 'success'
    };
    res.json(responseData);
    return;
  }
  catch (error: any) {
    res.status(401);
    throw new Error(error);
  }
}


// @desc: Get User by ID  
// @route Get /api/v1/users/:id
// @access: Private/Admin

export const getUserById: RequestHandler = async (req, res, next) => {
  const user: any = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  }
  else {
    res.status(404); throw new Error('User not found');
  }

};

// @desc: Delete single user by id
// @route DELETE /api/v1/users/:id
// @access: Private/Admin

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error('Cannot delete admin user');
      }
      await User.deleteOne({ _id: user._id });
      res.status(200).json({ message: 'User deleted successfully' });
    }
    else {
      res.status(404);
      throw new Error('User not found')
    }

  }
  catch (error: any) {
    res.status(404);
    throw new Error('Error happened please check the api')
  }
};


// @desc: Update single user by id
// @route PUT /api/v1/users/:id
// @access: Private/Admin

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const user: any = await User.findById(req.params.id);
    if (user)
    {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email; 
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
      });
    }
    else {
      res.status(404);
      throw new Error(`User not found with ${req.params.id}`);
    }
  }
   catch (error: any) {
    res.status(404);
    throw new Error('Error happened please check the api')
  }
  
};
