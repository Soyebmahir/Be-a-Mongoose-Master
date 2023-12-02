import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

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

academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartment.findOne({
        name: this.name,
    });
    if (isDepartmentExist) {
        throw new Error('This Department Already Exist');
    }
    next();
});
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();

    const isDepartmentExist = await AcademicDepartment.findById({
        _id: query._id,
    });

    if (!isDepartmentExist) {
        throw new Error('Department Doesnt exist');
    }
    next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema,
);
