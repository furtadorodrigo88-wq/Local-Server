import { Router } from "express"
import { servicoControler } from "../controlers/servico.controler.js"

const ServiceRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id"
}
const router = Router()
router.get(ServiceRoute.getAll, servicoControler.getAll)
router.get(ServiceRoute.getById, servicoControler.get)
router.post(ServiceRoute.create, servicoControler.createService)
router.put(ServiceRoute.update, servicoControler.update)
router.delete(ServiceRoute.delete, servicoControler.delete)

export { router }