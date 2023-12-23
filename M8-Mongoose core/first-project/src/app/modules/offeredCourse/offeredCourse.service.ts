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

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
    const { semesterRegistration, academicFaculty, section, academicDepartment, course, faculty, days, startTime, endTime } = payload

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

export const OfferedCourseServices = {
    createOfferedCourseIntoDb,
    updateOfferedCourseIntoDb
}