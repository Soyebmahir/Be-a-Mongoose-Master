import { Request, Response } from 'express';
import { StudentServices } from './student.service';







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
