import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculties } from "./course.interface";
import { Course, CourseFaculty } from "./course.model"
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";


const createCourseIntoDB = async (payload: TCourse) => {
    // console.log(payload);
    const result = await Course.create(payload)
    return result;
}
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
        .search(courseSearchableFields)
        .filter()
        .paginate()
        .sort()
        .fieldsLimiting()
    const result = await courseQuery.modelQuery
    return result;
}


const getSingleCoursesFromDB = async (id: string) => {
    // console.log(id);
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result;
}
const deleteCoursesFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return result;
}
const updateCoursesIntoDB = async (id: string, payload: Partial<TCourse>) => {

    const { preRequisiteCourses, ...remainingCourseData } = payload
    //create session
    const session = await mongoose.startSession()

    try {
        session.startTransaction();
        //basic Course info Update here
        const basicInfoUpdated = await Course.findByIdAndUpdate(id, remainingCourseData, { new: true, session })
        if (!basicInfoUpdated) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course')
        }

        //check if preRequisiteCourse exist
        if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
            //filter out the delete fields
            const deletePreRequisite = preRequisiteCourses?.filter(el => el.course && el.isDeleted).map(el => el.course)
            // console.log(deletePreRequisite);
            const deletedPreRequisiteCourse = await Course.findByIdAndUpdate(id, {
                $pull: { preRequisiteCourses: { course: { $in: deletePreRequisite } } }
            })

            if (!deletedPreRequisiteCourse) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deletePreRequisite Course')
            }




            const newPreRequisiteCourse = preRequisiteCourses?.filter(el => el.course && !el.isDeleted)
            // console.log(newPreRequisiteCourse);
            const addedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
                $addToSet: {
                    preRequisiteCourses: {
                        $each: newPreRequisiteCourse
                    }
                }
            })
            if (!addedPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add PreRequisite Course')
            }
        }

        const result = await Course.findById(id).populate('preRequisiteCourses.course')
        await session.commitTransaction()
        await session.endSession()
        return result;
    } catch (err) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, 'Something Went Wrong')

    }
}

const assignFacultiesOnSingleCourseIntoDb = async (id: string, payload: Partial<TCourseFaculties>) => {

    const result = await CourseFaculty.findByIdAndUpdate(id,
        {
            course: id,
            $addToSet: { faculties: { $each: payload } }
        },
        {
            upsert: true,
            new: true
        })
    return result;
}
const removeFacultiesOnSingleCourseIntoDb = async (id: string, payload: Partial<TCourseFaculties>) => {

    const result = await CourseFaculty.findByIdAndUpdate(id,
        {
            $pull: { faculties: { $in: payload } }
        },
        {

            new: true
        })
    return result;
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCoursesFromDB,
    deleteCoursesFromDB,
    updateCoursesIntoDB,
    assignFacultiesOnSingleCourseIntoDb,
    removeFacultiesOnSingleCourseIntoDb
}