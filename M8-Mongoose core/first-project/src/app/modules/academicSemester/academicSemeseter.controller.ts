import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemester Create Successfully.',
    data: result,
  });
});
const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All AcademicSemester Found Successfully.',
    data: result,
  });
});

const getAcademicSemesterById = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getAcademicSemesterByIdFromDB(semesterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Found Successfully.',
    data: result,
  });
});
const updateAcademicSemesterById = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const updateBody = req.body;
  const result =
    await AcademicSemesterServices.updateAcademicSemesterByIdFromDB(
      semesterId,
      updateBody,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Update Successfully.',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getAcademicSemesterById,
  updateAcademicSemesterById,
};
