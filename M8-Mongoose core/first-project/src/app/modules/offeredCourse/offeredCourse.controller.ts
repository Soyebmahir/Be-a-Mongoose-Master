import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDb(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course Created Successfully',
        data: result
    })
})
const updateOfferedCourse = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await OfferedCourseServices.updateOfferedCourseIntoDb(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course Updated Successfully',
        data: result
    })
})

export const OfferedCourseController = {
    createOfferedCourse,
    updateOfferedCourse
}