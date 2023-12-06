import { TErrorSources } from "../interface/Error";

export const handleDuplicateError = (err: any) => {

    const match = err.message.match(/"([^"]*)"/);
    // Extract the matched value
    const extractedValue = match && match[1];
    const errorSources: TErrorSources = [{
        path: '',
        message: `${extractedValue} is already Existed`
    }]
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate validation',
        errorSources

    }

}