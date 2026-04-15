import { Router } from "express"
import { proposalControler } from "../controlers/proposta.controler.js" 
import authMidlewere, { authorize } from "../security/auth.midlewere.js"
import { Role } from "../utils/types.js"


const proposalRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id",
    aceitar: "/aceitar/:id"
}
const router = Router()
router.use(authMidlewere)
router.get(proposalRoute.getAll, authorize([Role.ADMIN]), proposalControler.getAll)
router.get(proposalRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), proposalControler.get)
router.post(proposalRoute.create, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), proposalControler.createProposal)
router.put(proposalRoute.update, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), proposalControler.update)
router.delete(proposalRoute.delete, authorize([Role.ADMIN]), proposalControler.delete)
router.put(proposalRoute.aceitar, authorize([Role.ADMIN, Role.CLIENTE]), proposalControler.acceptProposal)

export { router }