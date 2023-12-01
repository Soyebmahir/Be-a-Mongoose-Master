import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";


const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
}

const getAllAcademicDepartment = async () => {
    const result = await AcademicDepartment.find({});
    return result;
}
const getSingleAcademicDepartmentFromDb = async (id: string) => {
    const result = await AcademicDepartment.findById(id);
    return result
}

const updateAcademicDepartmentIntoDB = async (id: string, payload: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findByIdAndUpdate({ _id: id }, payload)
    return result;

}

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartment,
    getSingleAcademicDepartmentFromDb,
    updateAcademicDepartmentIntoDB
}