import { Router } from "express";
import { OrcamentoController } from "../controllers/orcamento.controller.js";
import AuthMiddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const OrcamentoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    calcular: "/:id/calcular"
};

const router = Router();

router.get(OrcamentoRoute.getAll, OrcamentoController.getAll);
router.get(OrcamentoRoute.getById, OrcamentoController.get);

router.use(AuthMiddleware);

router.post(OrcamentoRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA]), OrcamentoController.create);
router.put(OrcamentoRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), OrcamentoController.update);
router.delete(OrcamentoRoute.delete, authorize([Role.ADMIN]), OrcamentoController.delete);
router.put(OrcamentoRoute.calcular, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), OrcamentoController.calculateBudget);

export { router };
