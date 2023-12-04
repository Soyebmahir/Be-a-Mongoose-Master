/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import { TErrorSources } from '../interface/Error';
import { handleZodError } from '../Errors/handleZodError';
import { handleMongooseError } from '../Errors/handleMongooseError';
const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'something Went wrong';

  let errorSources: TErrorSources = [{
    path: "",
    message: 'Something went Wrong'

  }]

  //error checking
  if (err instanceof ZodError) {
    const modifiedError = handleZodError(err)
    statusCode = modifiedError?.statusCode;
    message = modifiedError?.message;
    errorSources = modifiedError?.errorSources
  } if (err.name === 'ValidationError') {
    const modifiedError = handleMongooseError(err)
    statusCode = modifiedError?.statusCode;
    message = modifiedError?.message;
    errorSources = modifiedError?.errorSources

  }



  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null
  });
};
export default globalErrorHandler;
