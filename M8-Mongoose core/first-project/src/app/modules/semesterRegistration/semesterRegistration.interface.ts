import { Types } from "mongoose"

export type TSemesterRegistration = {
    academicSemester: Types.ObjectId;
    status: 'UPCOMING' | 'ONGoING' | 'ENDED';
    startDate: Date;
    endDate: Date
    minCredit: number;
    maxCredit: number
};