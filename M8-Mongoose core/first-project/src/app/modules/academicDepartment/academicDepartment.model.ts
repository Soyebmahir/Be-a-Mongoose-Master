import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// academicDepartmentSchema.pre('save', async function (next) {
//     const isDepartmentExist = await AcademicDepartment.findOne({
//         name: this.name,
//     });
//     if (isDepartmentExist) {
//         throw new AppError(httpStatus.NOT_FOUND, 'This Department Already Exist');
//     }
//     next();
// });
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExist = await AcademicDepartment.findById({
    _id: query._id,
  });

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department Doesnt exist');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
