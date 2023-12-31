import { Schema, model } from 'mongoose';

import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: academicSemesterName,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: academicSemesterCode,
  },
  startMonth: {
    type: String,
    enum: months,
  },
  endMonth: {
    type: String,
    enum: months,
  },
});

//checking year and name of semester is already exist
academicSemesterSchema.pre('save', async function () {
  const isSemesterExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester already Exist');
  }
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
