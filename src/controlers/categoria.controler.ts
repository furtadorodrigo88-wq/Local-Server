import type { Request, Response } from "express"
import type { CategoryType, ResponseType } from "../utils/types.js"
import { CategoryModel } from "../models/categoria.model.js"


export const CategoryControler = {
    async createCategory(req: Request, res: Response) {
        const newcategory: CategoryType = req.body
        if (!newcategory) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados categoria invalido",
                data: null
            }
            return res.status(400).json(response)
        }
        const createProviderResponse = await CategoryModel.create(newcategory)
        if (createProviderResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar categoria",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<CategoryType> = {
            status: "success",
            message: "categoria criado com sucesso",
            data: createProviderResponse
        }
        return res.status(201).json(response)
    },
    async getAll(req: Request, res: Response) {
        const getAllproviderResponce = await CategoryModel.getAll()
        if (!getAllproviderResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar categoria",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<CategoryType[]> = {
            status: "success",
            message: "categoria buscado com sucesso",
            data: getAllproviderResponce
        }
        return res.status(201).json(response)
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id do categoria nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }
        const getProviderResponce = await CategoryModel.get(id as string)
        if (!getProviderResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar categoria",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<CategoryType> = {
            status: "success",
            message: "categoria buscado co sucesso",
            data: getProviderResponce
        }
        return res.status(201).json(response)
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const newData: CategoryType = req.body
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        if (!newData) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de categoria invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const updateProviderResponse = await CategoryModel.update(id as string, newData)
        if (!updateProviderResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de categoria invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<CategoryType> = {
            status: "success",
            message: "categoria atualizado",
            data: updateProviderResponse
        }
        return res.status(200).json(response)
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        const deleteuProviderResponse = await CategoryModel.delete(id as string)
        if (!deleteuProviderResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<CategoryType> = {
            status: "success",
            message: "categoria apagado",
            data: deleteuProviderResponse
        }
        return res.status(200).json(response)
    }
}
