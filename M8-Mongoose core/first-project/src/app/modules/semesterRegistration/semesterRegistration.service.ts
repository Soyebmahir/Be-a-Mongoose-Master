/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.const';
import mongoose from 'mongoose';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';

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

    //check if the requested registered semester is exist
    const isSemesterRegistrationExist = await SemesterRegistration.findById(id)
    if (!isSemesterRegistrationExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found')
    }

    //if requested semester status already 'ENDED' , wont update anything
    const currentSemesterStatus = isSemesterRegistrationExist.status
    const requestedSemesterStatus = payload.status
    if (currentSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `This Semester is already ${currentSemesterStatus}`)

    }

    // status Update pattern: UPCOMING -->ONGOING --> ENDED
    //if currentSemesterStatus is UPCOMING and RequestedSemesterStatus is Ended
    if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestedSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `You cant Change status directly from ${currentSemesterStatus} to ${requestedSemesterStatus}`)

    }

    //if currentSemesterStatus is ONGOING and RequestedSemesterStatus is UPCOMING
    if (currentSemesterStatus === RegistrationStatus.ONGOING && requestedSemesterStatus === RegistrationStatus.UPCOMING) {
        throw new AppError(httpStatus.BAD_REQUEST, `You cant Change status directly from ${currentSemesterStatus} to ${requestedSemesterStatus}`)

    }
    const result = await SemesterRegistration.findByIdAndUpdate(id, payload)
    return result;
}
const deleteSemesterRegistrationFromDB = async (id: string) => {
    /** 
    * Step1: Delete associated offered courses.
    * Step2: Delete semester registraton when the status is 
    'UPCOMING'.
    **/

    // checking if the semester registration is exist
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

    if (!isSemesterRegistrationExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'This registered semester is not found !',
        );
    }

    // checking if the status is still "UPCOMING"
    const semesterRegistrationStatus = isSemesterRegistrationExists.status;

    if (semesterRegistrationStatus !== 'UPCOMING') {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `You can not update as the registered semester is ${semesterRegistrationStatus}`,
        );
    }

    const session = await mongoose.startSession();

    //deleting associated offered courses

    try {
        session.startTransaction();

        const deletedOfferedCourse = await OfferedCourse.deleteMany(
            {
                semesterRegistration: id,
            },
            {
                session,
            },
        );

        if (!deletedOfferedCourse) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to delete semester registration !',
            );
        }

        const deletedSemisterRegistration =
            await SemesterRegistration.findByIdAndDelete(id, {
                session,
                new: true,
            });

        if (!deletedSemisterRegistration) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to delete semester registration !',
            );
        }

        await session.commitTransaction();
        await session.endSession();

        return null;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDb,
    updateSemesterRegistrationIntoDB,
    deleteSemesterRegistrationFromDB
};
