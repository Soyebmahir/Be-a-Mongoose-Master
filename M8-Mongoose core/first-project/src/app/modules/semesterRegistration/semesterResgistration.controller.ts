import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { SemesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDb(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Semester Registration Done Successfully',
        data: result
    })
})
const getAllSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registrations are Found Successfully',
        data: result
    })
})
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDb(req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration Found Successfully',
        data: result
    })
})
const updateSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(req.params.id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Update Successfully',
        data: result
    })
})
const deleteSemesterRegistration = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result =
            await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester Registration is updated successfully',
            data: result,
        });
    },
);
export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    deleteSemesterRegistration
}