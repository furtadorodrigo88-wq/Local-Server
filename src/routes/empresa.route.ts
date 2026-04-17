import { Router } from "express"
import authMidlewere, { authorize, isOwner } from "../security/auth.midlewere.js"
import { Role } from "../utils/types.js"
import { CompanyControler } from "../controlers/empresa.controler.js"
import { CompanyModel } from "../models/empresa.model.js"


const CompanyRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}
const router = Router()
router.use(authMidlewere)
router.get(CompanyRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), CompanyControler.getAll)
router.get(CompanyRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), CompanyControler.get)
router.post(CompanyRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR]), CompanyControler.createCompany)
router.put(CompanyRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR]), isOwner(CompanyModel, "owner"), CompanyControler.update)
router.delete(CompanyRoute.delete, authorize([Role.ADMIN]), CompanyControler.delete)
export { router }