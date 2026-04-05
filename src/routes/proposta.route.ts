import { Router } from "express"
import { proposalControler } from "../controlers/proposta.controler.js" 


const proposalRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update:"/update/:id",
    delete: "/delete/:id",
    aceitar: "/aceitar/:id"
}
const router = Router()
router.get(proposalRoute.getAll, proposalControler.getAll)
router.get(proposalRoute.getById, proposalControler.get)
router.post(proposalRoute.create, proposalControler.createProposal)
router.put(proposalRoute.update, proposalControler.update)
router.delete(proposalRoute.delete, proposalControler.delete)
router.aceitar(proposalRoute.aceitar, proposalControler.acceptProposal)

export { router }