import { Router } from "express"
import { UserControler } from "../controlers/users.controler.js"
import authMidlewere from "../security/auth.midlewere.js"
import authGuard from "../security/authGuard.js"


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
router.get(UserRoute.getAll,authMidlewere, UserControler.getAll)
router.get(UserRoute.getById, UserControler.get)
router.post(UserRoute.create, UserControler.createUser)
router.put(UserRoute.update, UserControler.update)
router.delete(UserRoute.delete, UserControler.delete)
router.post(UserRoute.login, UserControler.login)
router.put(UserRoute.updatePassword,authGuard, UserControler.updatePassword)

export { router }