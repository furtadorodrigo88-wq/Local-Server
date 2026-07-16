import { Router } from "express";
import { PropostaController } from "../controllers/proposta.controller.js";
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";
import { PropostaModel } from "../models/proposta.model.js";

const PropostaRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    aceitar: "/aceitar/:id",
    getByUserId: "/get-by-user-id/:idUser"
};

const router = Router();

router.get(PropostaRoute.getAll, PropostaController.getAll);
router.get(PropostaRoute.getById, PropostaController.get);

router.use(AuthMiddleware);

router.post(PropostaRoute.create, authorize([Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), PropostaController.create);
router.put(PropostaRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), isOwner(PropostaModel, "owner"), PropostaController.update);
router.delete(PropostaRoute.delete, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(PropostaModel, "owner"), PropostaController.delete);
router.put(PropostaRoute.aceitar, authorize([Role.PRESTADOR, Role.EMPRESA, Role.CLIENTE]), PropostaController.aceitar);

export { router };
