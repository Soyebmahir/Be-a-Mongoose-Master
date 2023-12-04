import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../interface/Error";




//zod error handler
export const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorSources = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message

        }
    })
    const statusCode = 400;

    return {
        statusCode,
        message: 'validation Error',
        errorSources

    }
}