import { Router } from "express";
import { StudentRoutes } from "../modules/students/student.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router()

const moduleRoutes = [
    {
        path: "/students",
        route: StudentRoutes
    },
    {
        path: '/users',
        route: UserRoutes
    }
]

moduleRoutes.forEach(routes => router.use(routes.path, routes.route))

export default router;