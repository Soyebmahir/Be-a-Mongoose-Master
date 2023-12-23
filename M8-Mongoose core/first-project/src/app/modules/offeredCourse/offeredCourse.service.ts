import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utils";
import QueryBuilder from "../../builder/QueryBuilder";

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
    const { semesterRegistration, academicFaculty, section, academicDepartment, course, faculty, days, startTime, endTime } = payload

    /**
     * Step 1: check if the semester registration id is exists!
     * Step 2: check if the academic faculty id is exists!
     * Step 3: check if the academic department id is exists!
     * Step 4: check if the course id is exists!
     * Step 5: check if the faculty id is exists!
     * Step 6: check if the department is belong to the  faculty
     * Step 7: check if the same offered course same section in same registered semester exists
     * Step 8: get the schedules of the faculties
     * Step 9: check if the faculty is available at that time. If not then throw error
     * Step 10: create the offered course
     */

    const isSemesterRegistrationExist = await SemesterRegistration.findById(semesterRegistration)
    if (!isSemesterRegistrationExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This semester Registration not exist in DB')
    }

    const academicSemester = isSemesterRegistrationExist.academicSemester

    const isAcademicFacultyExist = await AcademicFaculty.findById(academicFaculty)
    if (!isAcademicFacultyExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academicFaculty not exist in DB')
    }

    const isAcademicDepartmentExist = await AcademicDepartment.findById(academicDepartment)
    if (!isAcademicDepartmentExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academicDepartment not exist in DB')
    }

    const isCourseExist = await Course.findById(course)
    if (!isCourseExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This course not exist in DB')
    }

    const isFacultyExist = await Faculty.findById(faculty)
    if (!isFacultyExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This faculty not exist in DB')
    }

    const isDepartmentBelongsToFaculty = await AcademicDepartment.findOne({
        academicFaculty,
        _id: academicDepartment
    })
    if (!isDepartmentBelongsToFaculty) {
        throw new AppError(httpStatus.NOT_FOUND, `This ${isAcademicDepartmentExist.name} is not belongs to ${isAcademicFacultyExist.name}`)
    }

    //check if the same offered course same section in same registered semester exist 
    const isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
        semesterRegistration,
        course,
        section
    });

    if (isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection) {
        throw new AppError(httpStatus.BAD_REQUEST, `Offered Course with same section is already exist`)
    }

    //if same faculty with same route conflict on Same semester
    //find the faculty info from semesterRegistration
    const assignedSchedules = await OfferedCourse.find({ semesterRegistration, faculty, days: { $in: days } }).select('days startTime endTime')

    console.log(assignedSchedules);
    const newSchedule = {
        days,
        startTime,
        endTime
    }


    if (hasTimeConflict(assignedSchedules, newSchedule)) {

        throw new AppError(httpStatus.CONFLICT, `This faculty is not available at that time. Choose other time or day. `)
    }

    const result = await OfferedCourse.create({ ...payload, academicSemester })
    return result;
}

const updateOfferedCourseIntoDb = async (id: string, payload: Pick<TOfferedCourse, 'days' | 'faculty' | 'startTime' | 'endTime'>) => {
    const { faculty, days, startTime, endTime } = payload
    /**
  * Step 1: check if the offered course exists
  * Step 2: check if the faculty exists
  * Step 3: check if the semester registration status is upcoming
  * Step 4: check if the faculty is available at that time. If not then throw error
  * Step 5: update the offered course
  */
    const isOfferedCourseExist = await OfferedCourse.findById(id)
    if (!isOfferedCourseExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Offered course not Founded')
    }
    const isFacultyExist = await Faculty.findById(faculty)
    if (!isFacultyExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This faculty not exist in DB')
    }

    //if same faculty with same route conflict on Same semester
    //find the faculty info from semesterRegistration

    const semesterRegistration = isOfferedCourseExist.semesterRegistration

    const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration)
    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
        throw new AppError(httpStatus.BAD_REQUEST, `You cant update this offered course as it it ${semesterRegistrationStatus?.status} `)
    }
    const assignedSchedules = await OfferedCourse.find({ semesterRegistration, faculty, days: { $in: days } }).select('days startTime endTime')

    console.log(assignedSchedules);
    const newSchedule = {
        days,
        startTime,
        endTime
    }


    if (hasTimeConflict(assignedSchedules, newSchedule)) {

        throw new AppError(httpStatus.CONFLICT, `This faculty is not available at that time. Choose other time or day. `)
    }

    const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true
    })
    return result;
}
const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
        .filter()
        .sort()
        .paginate()
        .fieldsLimiting();

    const result = await offeredCourseQuery.modelQuery;
    return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
    const offeredCourse = await OfferedCourse.findById(id);

    if (!offeredCourse) {
        throw new AppError(404, 'Offered Course not found');
    }

    return offeredCourse;
};
const deleteOfferedCourseFromDB = async (id: string) => {
    /**
     * Step 1: check if the offered course exists
     * Step 2: check if the semester registration status is upcoming
     * Step 3: delete the offered course
     */
    const isOfferedCourseExists = await OfferedCourse.findById(id);

    if (!isOfferedCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
    }

    const semesterRegistation = isOfferedCourseExists.semesterRegistration;

    const semesterRegistrationStatus =
        await SemesterRegistration.findById(semesterRegistation).select('status');

    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
        );
    }

    const result = await OfferedCourse.findByIdAndDelete(id);

    return result;
};

export const OfferedCourseServices = {
    createOfferedCourseIntoDb,
    updateOfferedCourseIntoDb,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    deleteOfferedCourseFromDB
}