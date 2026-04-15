import { Router } from "express"
import { budgetControler } from "../controlers/orcamento.controler.js"
import authMidlewere, { authorize } from "../security/auth.midlewere.js"
import { Role } from "../utils/types.js"



const budgetRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id",
    calcular: "/calcular/:id"
}
const router = Router()
router.use(authMidlewere)
router.get(budgetRoute.getAll, authorize([Role.ADMIN]),budgetControler.getAll)
router.get(budgetRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), budgetControler.get)
router.post(budgetRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA]), budgetControler.createBudget)
router.put(budgetRoute.update, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), budgetControler.update)
router.delete(budgetRoute.delete, authorize([Role.ADMIN]), budgetControler.delete)
router.put(budgetRoute.calcular, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), budgetControler.calculateBudget)

export { router }