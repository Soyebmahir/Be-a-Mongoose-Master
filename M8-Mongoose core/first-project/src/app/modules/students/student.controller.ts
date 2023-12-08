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
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Found Successfully',
    data: result,
  });
});
const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Successfully.',
    data: result,
  });
});
const updateStudentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body
  const result = await StudentServices.updateStudentIntoDB(id, student)
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
