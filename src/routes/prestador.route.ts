import { Router } from "express"
import { provaiderControler } from "../controlers/prestador.controler.js"


const ProviderRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id"
}
const router = Router()
router.get(ProviderRoute.getAll, provaiderControler.getAll)
router.get(ProviderRoute.getById, provaiderControler.get)
router.post(ProviderRoute.create, provaiderControler.createProvider)
router.put(ProviderRoute.update, provaiderControler.update)
router.delete(ProviderRoute.delete, provaiderControler.delete)

export { router }