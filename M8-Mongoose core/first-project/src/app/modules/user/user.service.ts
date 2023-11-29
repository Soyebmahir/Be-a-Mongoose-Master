import config from '../../config';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);

  //set Student role
  userData.role = 'student';
  //manually id
  userData.id = '2030100001';
  //create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const result = await Student.create(studentData);
    return result;
  }
};

export const UserService = {
  createStudentIntoDB,
};
