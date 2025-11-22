import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'validation_error',
      issues: error.issues.map(issue => ({
        field: issue.path[0],
        message: issue.message
      })),
    });
  }

  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}