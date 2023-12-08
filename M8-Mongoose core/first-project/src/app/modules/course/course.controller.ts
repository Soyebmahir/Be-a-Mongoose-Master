import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';



const createCourse = catchAsync(async (req, res) => {

    const result = await CourseServices.createCourseIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Create Successfully.',
        data: result,
    });
});
const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Courses Found Successfully.',
        data: result,
    });
});

const getSingleCourseById = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result =
        await CourseServices.getSingleCoursesFromDB(facultyId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty Found Successfully.',
        data: result,
    });
});
const deleteCourseById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await CourseServices.deleteCoursesFromDB(
        id

    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delete Course Successfully.',
        data: result,
    });
});

export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourseById, deleteCourseById
};
