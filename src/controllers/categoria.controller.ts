import type { Request, Response } from "express";
import type { CategoriaDBType, ResponseType } from "../utils/types.js";
import { CategoriaModel } from "../models/categoria.model.js";
import jwt from "jsonwebtoken";
 
export const CategoriaController = {
    async create(req: Request, res: Response) {
        const categoria: CategoriaDBType = req.body;

        if (!categoria) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de categoria inválidos",
                data: null,
            };
            return res.status(400).json(response);
        }

        const createCategoriaResponse = await CategoriaModel.create(categoria);

        if (!createCategoriaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar categoria",
                data: null,
            };
            return res.status(500).json(response);
        }

        const response: ResponseType<CategoriaDBType> = {
            status: "success",
            message: "Categoria criada com sucesso",
            data: createCategoriaResponse,
        };
        return res.status(201).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllCategoriasResponse = await CategoriaModel.getAll();

        if (!getAllCategoriasResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar categorias",
                data: null,
            };
            return res.status(500).json(response);
        }

        const response: ResponseType<CategoriaDBType[]> = {
            status: "success",
            message: "Categorias buscadas com sucesso",
            data: getAllCategoriasResponse,
        };
        return res.status(200).json(response);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const getCategoriaResponse: CategoriaDBType | null = await CategoriaModel.get(id as string);

        if (getCategoriaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar categoria",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<CategoriaDBType> = {
            status: "success",
            message: "Categoria encontrada com sucesso",
            data: getCategoriaResponse
        };
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const updatedCategoria: CategoriaDBType = req.body;

        if (!id || !updatedCategoria) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de categoria invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const updateCategoriaResponse: CategoriaDBType | null = await CategoriaModel.update(id as string, updatedCategoria);

        if (updateCategoriaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar categoria",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<CategoriaDBType> = {
            status: "success",
            message: "Categoria atualizada com sucesso",
            data: updateCategoriaResponse,
        };
        return res.status(200).json(response);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID da categoria é obrigatório",
                data: null,
            };
            return res.status(400).json(response);
        }

        const deleteCategoriaResponse: CategoriaDBType | null = await CategoriaModel.delete(id as string);

        if (deleteCategoriaResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao deletar categoria",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<CategoriaDBType> = {
            status: "success",
            message: "Categoria apagada com sucesso",
            data: deleteCategoriaResponse,
        };
        return res.status(200).json(response);
    },
};
