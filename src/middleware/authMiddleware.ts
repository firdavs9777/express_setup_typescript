import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler';
import User from '../models/users';
import { Request, Response, NextFunction } from 'express';
import { UserType } from '../data/user';


interface AuthenticatedRequest extends Request {
  user?: UserType;
}
// User must be authenticated protect routes
const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      //    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      // req.user = await User.findById((decoded as any).userId);
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string};
      let test = await User.findById(decoded.userId as string).select('-password');
      req.user = test;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

// User must be an admin
const admin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
