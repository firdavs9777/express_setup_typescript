import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/errorResponse';

interface ErrorWithStatus extends Error {
  statusCode?: number;
  code?: number;
  value?: string;
  errors?: { [key: string]: any };
}

const errorHandler = (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction): void => {
  let error = { ...err } as ErrorWithStatus;
  error.message = err.message;


  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose Duplication Error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }
  if (err.statusCode === 404) {
    const message = 'URL not found';
    error = new ErrorResponse(message, 400);
  }
  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors!).map((val: any) => val.message).join(', ');
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;

