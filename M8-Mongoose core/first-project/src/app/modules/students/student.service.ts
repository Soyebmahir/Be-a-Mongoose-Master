import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';



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
