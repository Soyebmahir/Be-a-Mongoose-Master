/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'something Went wrong';
  type TErrorSources = {
    path: string | number,
    message: string
  }[]
  let errorSources: TErrorSources = [{
    path: "",
    message: 'Something went Wrong'

  }]

  //zod error handler
  const handleZodError = (err: ZodError) => {
    const errorSources = err.issues.map((issue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message

      }
    })
    statusCode = 400;
    message = 'validation Error'
    return {
      statusCode,
      message,
      errorSources

    }
  }
  //error checking
  if (err instanceof ZodError) {
    const modifiedError = handleZodError(err)
    statusCode = modifiedError.statusCode;
    message = modifiedError.message;
    errorSources = modifiedError.errorSources
  }


  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null
  });
};
export default globalErrorHandler;
