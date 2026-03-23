import { Router } from "express"
import { budgetControler } from "../controlers/orcamento.controler.js"



const budgetRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id"
}
const router = Router()
router.get(budgetRoute.getAll, budgetControler.getAll)
router.get(budgetRoute.getById, budgetControler.get)
router.post(budgetRoute.create, budgetControler.createBudget)
router.put(budgetRoute.update, budgetControler.update)
router.delete(budgetRoute.delete, budgetControler.delete)

export { router }