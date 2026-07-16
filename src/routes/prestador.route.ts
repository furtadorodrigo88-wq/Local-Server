import { Router } from "express";
import AuthMiddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";
import { PrestadorController } from "../controllers/prestador.controller.js";

const PrestadorRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
<<<<<<< HEAD
    update: "/update/:id",
    delete: "/delete/:id"
};

const router = Router();

router.get(PrestadorRoute.getAll, PrestadorController.getAll);
router.get(PrestadorRoute.getById, PrestadorController.get);

router.use(AuthMiddleware);

router.post(PrestadorRoute.create, authorize([Role.ADMIN]), PrestadorController.create);
router.put(PrestadorRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), PrestadorController.update);
router.delete(PrestadorRoute.delete, authorize([Role.ADMIN]), PrestadorController.delete);

export { router };
=======
    update:"/update/:id",
    delete: "/delete/:id",
    getPrecoHora: "/get-preco-hora/:id"
}
const router = Router()
router.get(ProviderRoute.getAll, authorize ([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), provaiderControler.getAll)
router.get(ProviderRoute.getById, authorize ([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), provaiderControler.get)
router.use(authMidlewere)
router.post(ProviderRoute.create, authorize ([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]),provaiderControler.createProvider)
router.put(ProviderRoute.update, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(ProviderModel, "owner"), provaiderControler.update)
router.delete(ProviderRoute.delete, authorize([Role.ADMIN, Role.PRESTADOR]), isOwner(ProviderModel, "owner"), provaiderControler.delete)
<<<<<<< HEAD
router.get(ProviderRoute.getPrecoHora, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), provaiderControler.getPrecoHora)
=======
router.get(ProviderRoute.getPrecoHora, provaiderControler.getPrecoHora)
>>>>>>> dc3632255aa931ede8e1318ffa1c46d7e3e5b217
export { router }
>>>>>>> 61615bc2bb2fdb0ce6023eaf64fc9321aa937ecc
