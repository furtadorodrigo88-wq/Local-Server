import { Router } from "express"
import authMidlewere, { authorize } from "../security/auth.midlewere.js"
import { Role } from "../utils/types.js"
import { CategoryControler } from "../controlers/categoria.controler.js"



const CategoryRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id"
}
const router = Router()
router.get(CategoryRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]),CategoryControler.getAll)
router.get(CategoryRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), CategoryControler.get)
router.use(authMidlewere)
router.post(CategoryRoute.create, authorize([Role.ADMIN]), CategoryControler.createCategory)
router.put(CategoryRoute.update, authorize([Role.ADMIN]), CategoryControler.update)
router.delete(CategoryRoute.delete, authorize([Role.ADMIN]), CategoryControler.delete)
export { router }