import { ServicoController } from "../controllers/servico.controller.js";
import { Router } from "express";
import AuthMiddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const ServicoRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllDetailed: "/get-all-detailed"
};

const router = Router();

router.get(ServicoRoute.getAll, ServicoController.getAll);
router.get(ServicoRoute.getById, ServicoController.get);
router.get(ServicoRoute.getAllDetailed, ServicoController.getAllServicoDetalhado);

router.use(AuthMiddleware);

router.post(ServicoRoute.create, authorize([Role.ADMIN]), ServicoController.createServico);
router.put(ServicoRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), ServicoController.update);
router.delete(ServicoRoute.delete, authorize([Role.ADMIN]), ServicoController.delete);

export { router };
