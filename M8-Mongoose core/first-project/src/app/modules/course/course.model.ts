import { Schema, model } from "mongoose";
import { TCourse, TCourseFaculties, TPreRequisiteCourses } from "./course.interface";


const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    prefix: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: Number,
        trim: true,
        required: true
    },
    credits: {
        type: Number,
        trim: true,
        required: true
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
        type: Boolean,
        default: false
    }


})

export const Course = model<TCourse>('Course', courseSchema)


//course faculties schema
const courseFacultiesSchema = new Schema<TCourseFaculties>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        unique: true
    },
    faculties: [{
        type: Schema.Types.ObjectId,
        ref: 'Faculty'

    }]
})
export const CourseFaculty = model<TCourseFaculties>('CourseFaculty', courseFacultiesSchema)