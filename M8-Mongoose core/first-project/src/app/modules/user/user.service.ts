import config from "../../config";
import { TStudent } from "../students/student.interface";
import { NewUser, TUser } from "./user.interface";

import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    const userData: Partial<TUser> = {};
    userData.password = password || config.default_pass as string

    //set Student role
    userData.role = 'student'
    //manually id
    userData.id = '2030100001'
    //create a user
    const result = await User.create(userData);

    // create a student
    if (Object.keys(result).length) {
        studentData.id = result.id
        studentData.user = result._id
    }
};

export const UserService = {
    createStudentIntoDB
}