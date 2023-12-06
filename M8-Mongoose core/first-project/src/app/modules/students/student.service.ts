


import { Student } from './student.model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';


const getAllStudents = async (query: Record<string, unknown>) => {


  // spreading query object so that we can exclude some field and shouldnot affect the real query object
  const queryObj = { ...query }
  //exclude fields
  const excludeFields = ["searchTerm", "sort", 'limit', 'page', 'fields']
  excludeFields.forEach(element => {
    delete queryObj[element]
  });
  console.log({ query });
  console.log({ queryObj });

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
  }
  //for method chaining we separated this as searchQuery

  const searchableFields = ['email', 'presentAddress', 'name.firstName']
  const searchQuery = Student.find({
    $or: searchableFields.map((field) => ({ //need to cover this [field]: { $regex: searchTerm, $options: "i" } in first bracket
      [field]: { $regex: searchTerm, $options: "i" }
    }))
  })

  const filterQuery = searchQuery.find(queryObj)
    .populate('admissionSemester')
    .populate('user').populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty'
      }
    });
  let sort = "-createdAt";
  if (query?.sort) {
    sort = query.sort as string
  }

  const sortQuery = filterQuery.sort(sort)


  let page = 1
  let limit = 1
  let skip = 0
  //check limit
  if (query?.limit) {
    limit = Number(query.limit)
  }
  //check page
  if (query?.page) {
    page = Number(query.page)
    skip = (page - 1) * limit
  }



  const paginationQuery = sortQuery.skip(skip)

  const limitQuery = paginationQuery.limit(limit)

  //fields limiting
  let fields = '__v'

  // fields = 'name,email'
  // fields = 'name email'
  if (query?.fields) {
    fields = (query.fields as string).split(',').join(' ')
    console.log({ fields });
  }

  const fieldsQuery = await limitQuery.select(fields)

  // console.log(result);
  return fieldsQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ _id: id })
  const result = await Student.findOne({ id }).populate('admissionSemester').populate('user').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  });
  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload
  const modifiedUpdateData: Record<string, unknown> = { ...remainingStudentData }
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, { new: true })

  return result;
};
const deleteSingleStudentFromDb = async (id: string) => {
  if (!(await Student.isUserExist(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student With this Id is not exist')
  }
  //create session
  const session = await mongoose.startSession()
  try {
    //start transaction 
    session.startTransaction()


    //delete student (transaction 1)
    const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student')
    }
    //delete user (transaction 2)

    const deletedUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session })
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

  }
};
export const StudentServices = {
  getAllStudents,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteSingleStudentFromDb,
};
