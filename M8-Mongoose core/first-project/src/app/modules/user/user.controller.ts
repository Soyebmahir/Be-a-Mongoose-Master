import { Request, Response } from "express";
import { UserService } from "./user.service";
import userValidationSchema from "./user.validation";

const createStudent = async (req: Request, res: Response) => {
    try {


        const { password, student: studentData } = req.body;


        //data validation using zod
        // const zodParseData = userValidationSchema.parse(student)

        // call service func
        const result = await UserService.createStudentIntoDB(password, studentData);




        // send response
        res.status(200).json({
            success: true,
            message: 'Student create successfully',
            data: result,
        });
    } catch (err: any) {
        console.log('eeeeeeeeeeeeeeee', err, err.message);
        res.status(500).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
};

export const UserController = {
    createStudent
}