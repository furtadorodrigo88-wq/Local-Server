import { Router } from "express"
import { UserControler } from "../controlers/users.controler.js"


const UserRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id"
}
const router = Router()
router.get(UserRoute.getAll, UserControler.getAll)
router.get(UserRoute.getById, UserControler.get)
router.post(UserRoute.create, UserControler.createUser)
router.put(UserRoute.update, UserControler.update)
router.delete(UserRoute.delete, UserControler.delete)

export { router }