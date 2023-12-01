import config from '../../config';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);

  //set Student role
  userData.role = 'student';



  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)
  // if (!admissionSemester) {
  //   throw new Error('Admission Semester not found')
  // }


  //automatically year code and 4 digits 
  userData.id = await generateStudentId(admissionSemester!); //here after exclamatory sign after admissionSemester variable means this varibale cant be false




  //create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    const result = await Student.create(payload);
    return result;
  }
};

export const UserService = {
  createStudentIntoDB,
};
