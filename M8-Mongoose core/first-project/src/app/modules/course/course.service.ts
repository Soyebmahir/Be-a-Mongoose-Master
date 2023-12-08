import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model"

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result;
}
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find(), query)
        .search(courseSearchableFields)
        .filter()
        .paginate()
        .sort()
        .fieldsLimiting()
    const result = await courseQuery.modelQuery
    return result;
}


const getSingleCoursesFromDB = async (id: string) => {
    const result = await Course.findById(id)
    return result;
}
const deleteCoursesFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return result;
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCoursesFromDB,
    deleteCoursesFromDB
}