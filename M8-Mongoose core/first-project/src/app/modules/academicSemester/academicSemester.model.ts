import { Schema, model } from 'mongoose';

import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';

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
export const AcademicSemester = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);
