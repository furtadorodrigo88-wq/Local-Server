import { Router } from "express";
import { PrestacaoServicoController } from "../controllers/prestacao-servico.controller.js";
import AuthMiddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const PrestacaoServicoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllPrestacaoServicoDetalhado: "/get-all-detalhado",
    getPrestacaoServicoByCategoriaDetalhado: "/get-by-categoria/:categoria"
};

const router = Router();

router.get(PrestacaoServicoRoute.getAll, PrestacaoServicoController.getAll);
router.get(PrestacaoServicoRoute.getById, PrestacaoServicoController.get);
router.get(PrestacaoServicoRoute.getAllPrestacaoServicoDetalhado, PrestacaoServicoController.getAllPrestacaoServicoDetalhado);

router.use(AuthMiddleware);

router.post(PrestacaoServicoRoute.create, authorize([Role.ADMIN, Role.CLIENTE]), PrestacaoServicoController.create);
router.put(PrestacaoServicoRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.update);
router.delete(PrestacaoServicoRoute.delete, authorize([Role.ADMIN]), PrestacaoServicoController.delete);

router.get(PrestacaoServicoRoute.getPrestacaoServicoByCategoriaDetalhado, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), PrestacaoServicoController.getAllPrestacaoServicoByCategoria);

export { router };
