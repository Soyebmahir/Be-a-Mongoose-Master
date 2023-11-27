/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
// import userValidationSchema from "./user.validation";




const createStudent = catchAsync(async (
    req,
    res) => {


    const { password, student: studentData } = req.body;

    // call service func
    const result = await UserService.createStudentIntoDB(password, studentData);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student create successfully',
        data: result
    })
}
)

export const UserController = {
    createStudent
}