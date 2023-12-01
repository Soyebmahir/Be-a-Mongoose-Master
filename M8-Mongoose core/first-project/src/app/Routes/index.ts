import { Router } from 'express';
import { StudentRoutes } from '../modules/students/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-Semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-Faculty',
    route: academicFacultyRoutes,
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
