import { Router } from "express"
import { SPControler } from "../controlers/prestacao_servico.controler.js" 
import authMidlewere, { authorize, isOwner } from "../security/auth.midlewere.js"
import { Role } from "../utils/types.js"
import { serviceProvModel } from "../models/prestacao_servico.models.js"


const serviceProvRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id",
    getAllServiceProvDetails: "/get-all-details",
    getAllServiceProvByCategoria: "/get-all-by-categoria/:id_categoria"
}
const router = Router()
router.use(authMidlewere)
router.get(serviceProvRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), SPControler.getAll)
router.get(serviceProvRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), SPControler.get)
router.post(serviceProvRoute.create, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]),SPControler.createSP)
router.put(serviceProvRoute.update, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(serviceProvModel, "owner"), SPControler.update)
router.delete(serviceProvRoute.delete, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(serviceProvModel, "owner"), SPControler.delete)
router.get(serviceProvRoute.getAllServiceProvDetails,authorize([Role.ADMIN]), SPControler.getAllServiceProvDetails)
router.get(serviceProvRoute.getAllServiceProvByCategoria,authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), SPControler.getAllServiceProvByCategoria) 

export { router }