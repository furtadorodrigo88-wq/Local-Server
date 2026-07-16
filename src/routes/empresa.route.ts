import { Router } from "express";
import { EmpresaController } from "../controllers/empresa.controller.js";
import AuthMiddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const EmpresaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
};

const router = Router();

router.get(EmpresaRoute.getAll, EmpresaController.getAll);
router.get(EmpresaRoute.getById, EmpresaController.get);

router.use(AuthMiddleware);

router.post(EmpresaRoute.create, authorize([Role.ADMIN]), EmpresaController.create);
router.put(EmpresaRoute.update, authorize([Role.ADMIN, Role.EMPRESA]), EmpresaController.update);
router.delete(EmpresaRoute.delete, authorize([Role.ADMIN]), EmpresaController.delete);

export { router };
