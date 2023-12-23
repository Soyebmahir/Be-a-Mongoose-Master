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
const getAllOfferedCourses = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.getAllOfferedCoursesFromDB
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourses retrieved successfully !',
        data: result,
    });
});

const getSingleOfferedCourses = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'OfferedCourse fetched successfully',
            data: result,
        });
    },
);
const deleteOfferedCourse = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'OfferedCourse deleted successfully',
            data: result,
        });
    },
);

export const OfferedCourseController = {
    createOfferedCourse,
    updateOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourses,
    deleteOfferedCourse

}