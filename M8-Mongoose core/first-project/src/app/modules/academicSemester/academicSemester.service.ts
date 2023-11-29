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
const getAcademicSemesterByIdFromDB = async (id: string) => {
    const result = await AcademicSemester.find({ _id: id })
    return result;
}
export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getAcademicSemesterByIdFromDB
}