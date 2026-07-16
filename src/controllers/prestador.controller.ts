import { PrestadorModel } from "../models/prestador.model.js";
import type { Request, Response } from "express";


export const PrestadorController = {
    getAll: async (req: Request, res: Response) => {
        const prestadores = await PrestadorModel.getAll()
        if (!prestadores)
            return res.status(404).json({ message: "Prestadores nao encontrados" });
        return res.status(200).json({ message: "Prestadores encontrados", prestadores: prestadores });
    },
    get: async (req: Request, res: Response) => {
        const prestador = await PrestadorModel.get(req.params.id as string);
        if (!prestador)
            return res.status(404).json({ message: "Prestador nao encontrado" });
        return res.status(200).json({ message: "Prestador encontrado", prestador: prestador });
    },
    create: async (req: Request, res: Response) => {
        const prestador = await PrestadorModel.create(req.body);
        if (!prestador)
            return res.status(404).json({ message: "Prestador nao criado" });
        return res.status(201).json({ message: "Prestador criado com sucesso", prestador: prestador });
    },
    update: async (req: Request, res: Response) => {
        const prestador = await PrestadorModel.update(req.params.id as string, req.body);
        if (!prestador)
            return res.status(404).json({ message: "Prestador nao atualizado" });
        return res.status(200).json({ message: "Prestador atualizado com sucesso", prestador: prestador });
    },
    delete: async (req: Request, res: Response) => {
        const prestador = await PrestadorModel.delete(req.params.id as string);
        if (!prestador)
            return res.status(404).json({ message: "Prestador nao deletado" });
        return res.status(200).json({ message: "Prestador deletado com sucesso", prestador: prestador });
    },
}
