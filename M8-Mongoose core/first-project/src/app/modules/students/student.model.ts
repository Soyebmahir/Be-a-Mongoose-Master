/* eslint-disable @typescript-eslint/no-this-alias */
import validator from 'validator';
import { Schema, model } from 'mongoose';
import {
    TGuardian,
    TLocalGuardian,
    TStudent,

    StudentModel,
    TUserName,

} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';



const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First Name is Required'],
        maxlength: [20, 'First name must be less than 20 character'],
        trim: true,
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
                return value === firstNameStr
            },
            message: '{VALUE} should be in capitalize format.'
        }
    },
    middleName: { type: String },
    lastName: {
        type: String, required: [true, 'Last Name is Required'],
        maxlength: [20, 'Last name must be less than 20'],
        trim: true,
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: `{VALUE} is not valid`
        }
    },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
});
const guardianSchema = new Schema<TGuardian>({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContact: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContact: { type: String, required: true },
});
const studentSchema = new Schema<TStudent, StudentModel>({
    id: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],

    },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required'],

    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not valid, should be "male" or "female"',
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of Birth is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: '{VALUE} is not valid email address pattern'
        }
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
    },
    emergencyContact: {
        type: String,
        required: [true, 'Emergency contact is required'],
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
            message: '{VALUE} is not valid',
        },
        required: [true, 'Blood group is required'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required'],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        virtuals: true
    }
});

//virtuals
studentSchema.virtual('fullname').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// document middleware -> directed to current document
studentSchema.pre('save', async function (next) {
    // console.log(this, 'pre function before save data');

    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round));
    next();


})
studentSchema.post('save', function (doc, next) {
    doc.password = " ";
    // console.log(this, 'post function after save data');
    next()
})
//query middleware -> directed to current query
studentSchema.pre('find', function (next) {

    this.find({ isDeleted: { $ne: true } })

    next()
})
studentSchema.pre('findOne', function (next) {
    this.findOne({ isDeleted: { $ne: true } })
    next();
})
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next();
})











// create schema for custom static method 
studentSchema.statics.isUserExist = async function (id: string) {
    const existingUser = await Student.findOne({ id })
    return existingUser;

}

// create schema for custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//     const existingUser = await Student.findOne({ id })
//     return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
// export default StudentModel;
