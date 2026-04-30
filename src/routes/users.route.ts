import { Router } from "express"
import { UserControler } from "../controlers/users.controler.js"
import authMidlewere, { authorize } from "../security/auth.midlewere.js"
import authGuard from "../security/authGuard.js"
import { Role } from "../utils/types.js"


const UserRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "/login",
    updatePassword: "/update-password/:id"
}
const router = Router()
router.post(UserRoute.create, UserControler.createUser)
router.post(UserRoute.login, UserControler.login)
router.use(authMidlewere)
router.get(UserRoute.getAll, authorize([Role.ADMIN]), UserControler.getAll)
router.get(UserRoute.getById, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), UserControler.get)
router.put(UserRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), UserControler.update)
router.delete(UserRoute.delete,authorize([Role.ADMIN]), UserControler.delete)
router.put(UserRoute.updatePassword,authGuard,authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), UserControler.updatePassword)

export { router }