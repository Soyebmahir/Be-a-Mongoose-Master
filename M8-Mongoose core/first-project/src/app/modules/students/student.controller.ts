import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {

  const result = await StudentServices.getAllStudents(req.query);
  // res.status(200).json({
  //   success: true,
  //   message: 'Data Found Successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Found Successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Found Successfully',
    data: result,
  });
});
const deleteSingleStudent = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDb(studentID);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Successfully.',
    data: result,
  });
});
const updateStudentById = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const { student } = req.body
  const result = await StudentServices.updateStudentIntoDB(studentID, student)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Successfully',
    data: result
  })
})

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateStudentById
};
