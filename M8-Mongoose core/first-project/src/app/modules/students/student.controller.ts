import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';


// import studentValidationSchema from '../student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {


    const student = req.body.student;
    // console.log(req.body);
    //data validation using joi
    // const { error, value } = studentValidationSchema.validate(student)

    //data validation using zod
    const zodParseData = studentValidationSchema.parse(student)

    // call service func
    const result = await StudentServices.createStudentIntoDB(zodParseData);


    //this one is from joi
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went Wrong.',
    //     error: error.details
    //   });
    // }

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

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'Data Found Successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went Wrong.',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentID)
    res.status(200).json({
      success: true,
      message: 'Data found successfully',
      data: result
    })
  } catch (err) {

    res.status(500).json({
      success: false,
      message: 'Something went Wrong.',
      error: err,
    });

  }

}
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDb(studentID)
    res.status(200).json({
      success: true,
      message: 'Deleted Successfully',
      data: result
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went Wrong.',
      error: err,
    });
  }
}

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent
};
