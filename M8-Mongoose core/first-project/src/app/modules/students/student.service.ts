import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  //1.build in static method


  //crate an custom static method
  if (await Student.isUserExist(studentData.id)) {
    console.log('hellow');
    throw new Error('User already exist')
  }
  const result = await Student.create(studentData);

  //create an intance
  // const student = new Student(studentData)
  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('User already exist')
  // }
  // const result = await student.save()
  return result;
};

const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ _id: id })
  const result = await Student.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } }
  ])
  return result;
}
const deleteSingleStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true })
  return result
}
export const StudentServices = {
  createStudentIntoDB,
  getAllStudents,
  getSingleStudentFromDB,
  deleteSingleStudentFromDb
};
