import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDb = async (
    payload: TSemesterRegistration,
) => {
    const academicSemester = payload?.academicSemester;

    const isSemesterRegistrationExist = await SemesterRegistration.findOne({
        academicSemester,
    });
    if (!isSemesterRegistrationExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'This Semester is already registered',
        );
    }

    const isAcademicSemesterExist =
        await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'This Academic Semester in not found on the Database',
        );
    }

    const result = await SemesterRegistration.create(payload);
    return result;
};

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDb,
};
