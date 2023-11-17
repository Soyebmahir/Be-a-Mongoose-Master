import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        const student = req.body.student
        // call service func
        const result = await StudentServices.createStudentIntoDB(student)
        // send response
        res.status(200).json({
            success: true,
            message: 'Student create successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
    }
}

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudents();
        res.status(200).json({
            success: true,
            message: 'Data Found Successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
    }

}

export const StudentController = {
    createStudent,
    getAllStudents
}