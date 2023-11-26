/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
// import userValidationSchema from "./user.validation";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { password, student: studentData } = req.body;

        // call service func
        const result = await UserService.createStudentIntoDB(password, studentData);

        // send response
        res.status(200).json({
            success: true,
            message: 'Student create successfully',
            data: result,
        });
    } catch (err: any) {

        next(err)
    }
};

export const UserController = {
    createStudent
}