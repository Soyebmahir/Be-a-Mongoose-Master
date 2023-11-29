import { academicSemesterNameCodeMapper } from "./academicSemester.const";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {


    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code')
    }
    const result = await AcademicSemester.create(payload)
    return result;
}

const getAllAcademicSemesterFromDB = async () => {
    const result = await AcademicSemester.find({})
    return result;
}
const getAcademicSemesterByIdFromDB = async (_id: string) => {
    const result = await AcademicSemester.find({ _id })
    return result;
}
const updateAcademicSemesterByIdFromDB = async (id: string, payload: Partial<TAcademicSemester>) => {
    if (payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code.')
    }
    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
        new: true,
        upsert: true
    })
    return result;
}
export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getAcademicSemesterByIdFromDB,
    updateAcademicSemesterByIdFromDB
}