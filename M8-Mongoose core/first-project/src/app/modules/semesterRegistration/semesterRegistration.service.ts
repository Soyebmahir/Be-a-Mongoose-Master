import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDb = async (
    payload: TSemesterRegistration,
) => {
    const academicSemester = payload?.academicSemester;

    //check if there any registered semester that has already 'UPCOMING' or 'ONGOING'
    const isThereAnyUpcomingOrOngoingSemesterRegistered = await SemesterRegistration.findOne({
        $or: [
            { status: 'UPCOMING' },
            { status: 'ONGOING' }
        ]
    })
    if (isThereAnyUpcomingOrOngoingSemesterRegistered) {
        throw new AppError(httpStatus.BAD_REQUEST, `There is already ${isThereAnyUpcomingOrOngoingSemesterRegistered.status} Semester Registered`)
    }
    //checking if the semester is exist in database
    const isAcademicSemesterExist =
        await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'This Academic Semester in not found on the Database',
        );
    }

    //checking if the semester is already registered
    const isSemesterRegistrationExist = await SemesterRegistration.findOne({
        academicSemester,
    });
    if (isSemesterRegistrationExist) {
        throw new AppError(
            httpStatus.CONFLICT,
            'This Semester is already registered',
        );
    }


    //semester registration
    const result = await SemesterRegistration.create(payload);
    return result;
};

const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query).filter().paginate().sort().fieldsLimiting()

    const result = await semesterRegistrationQuery.modelQuery;
    return result
}

const getSingleSemesterRegistrationFromDb = async (id: string) => {
    const result = await SemesterRegistration.findById(id)
    return result
}
const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {

    //if requested semester status already 'ENDED' , wont update anything
    const requestedSemester = await SemesterRegistration.findById(id)
    if (requestedSemester?.status === 'ENDED') {
        throw new AppError(httpStatus.BAD_REQUEST, `This Semester is already ${requestedSemester?.status}`)

    }
    const result = await SemesterRegistration.findByIdAndUpdate(id, payload)
    return result;
}

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDb,
    updateSemesterRegistrationIntoDB
};
