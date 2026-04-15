import { Router } from "express"
import { servicoControler } from "../controlers/servico.controler.js"
import authMidlewere, { authorize } from "../security/auth.midlewere.js"
import { Role } from "../utils/types.js"

const ServiceRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id",
    getAllDetailed: "/get-all-detailed"
}
const router = Router()
router.get(ServiceRoute.getAll,authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), servicoControler.getAll)
router.get(ServiceRoute.getAllDetailed,authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), servicoControler.getAllServicesDetailed)
router.get(ServiceRoute.getById,authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE, Role.EMPRESA]), servicoControler.get)
router.use(authMidlewere)
router.post(ServiceRoute.create,authorize([Role.ADMIN]), servicoControler.createService)
router.put(ServiceRoute.update,authorize([Role.ADMIN]), servicoControler.update)
router.delete(ServiceRoute.delete,authorize([Role.ADMIN]), servicoControler.delete)

export { router }