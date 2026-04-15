import { Router } from "express"
import { provaiderControler } from "../controlers/prestador.controler.js"
import authMidlewere, { authorize } from "../security/auth.midlewere.js"
import { Role } from "../utils/types.js"


const ProviderRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id"
}
const router = Router()
router.get(ProviderRoute.getAll, authorize ([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), provaiderControler.getAll)
router.get(ProviderRoute.getById, authorize ([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), provaiderControler.get)
router.use(authMidlewere)
router.post(ProviderRoute.create, authorize ([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]),provaiderControler.createProvider)
router.put(ProviderRoute.update, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]),provaiderControler.update)
router.delete(ProviderRoute.delete, authorize([Role.ADMIN, Role.PRESTADOR]),provaiderControler.delete)

export { router }