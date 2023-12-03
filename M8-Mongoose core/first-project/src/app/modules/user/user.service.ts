import mongoose from 'mongoose';
import config from '../../config';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);

  //set Student role
  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  // if (!admissionSemester) {
  //   throw new Error('Admission Semester not found')
  // }

  //create a session with mongoose
  const session = await mongoose.startSession();
  try {
    //have start the transaction
    session.startTransaction()

    //automatically year code and 4 digits
    userData.id = await generateStudentId(admissionSemester!); //here after exclamatory sign after admissionSemester variable means this varibale cant be false

    //create a user (Transaction -1)
    const newUser = await User.create([userData], { session }); //array

    // create a student
    //if (Object.keys(newUser).length) { //this way wont not work cz newUser now a array
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User not created')
    } else {
      //set id , _id
      // payload.id = newUser.id; 
      // payload.user = newUser._id; ///this way wont not work cz newUser now a array
      payload.id = newUser[0].id
      payload.user = newUser[0]._id // as reference

      //create student (transaction -2)
      const newStudent = await Student.create([payload], { session });//arrray
      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Student not created')
      }
      //save the data to DB by commit the transaction 

      await session.commitTransaction();
      await session.endSession();

      return newStudent;
    }
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

  }

};

export const UserService = {
  createStudentIntoDB,
};
