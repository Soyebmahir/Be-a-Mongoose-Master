export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContact: string;
    motherName: string;
    motherOccupation: string;
    motherContact: string;

}
export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};
export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
}

export type Student = {
    id: string;
    name: UserName;
    gender: "male" | "female";
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContact: string;
    bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?: string

}