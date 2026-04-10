import { Router } from "express"
import { SPControler } from "../controlers/prestacao_servico.controler.js" 


const proposelRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id",
    getAllServiceProvDetails: "/get-all-details"
}
const router = Router()
router.get(proposelRoute.getAll, SPControler.getAll)
router.get(proposelRoute.getById, SPControler.get)
router.post(proposelRoute.create, SPControler.createSP)
router.put(proposelRoute.update, SPControler.update)
router.delete(proposelRoute.delete, SPControler.delete)
router.get(proposelRoute.getAllServiceProvDetails, SPControler.getAllServiceProvDetails)

export { router }