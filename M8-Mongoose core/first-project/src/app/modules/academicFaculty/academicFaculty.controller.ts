import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from './academicFaculty.service';


const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "AcademicFaculty Create Successfully.",
        data: result
    })


})
const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFaculty();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All AcademicFaculty Found Successfully.",
        data: result
    })


})

const getAcademicFacultyById = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDb(semesterId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty Found Successfully.",
        data: result
    })
})
const updateAcademicFacultyById = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const updateBody = req.body;
    const result = await AcademicFacultyServices.updateFacultyIntoDB(semesterId, updateBody)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty Update Successfully.",
        data: result
    })
})

export const academicSemesterController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getAcademicFacultyById,
    updateAcademicFacultyById
}