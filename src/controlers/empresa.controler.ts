import type { Request, Response } from "express"
import type { CompanyType, ResponseType } from "../utils/types.js"
import { CompanyModel } from "../models/empresa.model.js"




export const CompanyControler = {
    async createCompany(req: Request, res: Response) {
        const newcompany: CompanyType = req.body
        if (!newcompany) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados empresa invalido",
                data: null
            }
            return res.status(400).json(response)
        }
        const createProviderResponse = await CompanyModel.create(newcompany)
        if (createProviderResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar empresa",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<CompanyType> = {
            status: "success",
            message: "empresa criado com sucesso",
            data: createProviderResponse
        }
        return res.status(201).json(response)
    },
    async getAll(req: Request, res: Response) {
        const getAllproviderResponce = await CompanyModel.getAll()
        if (!getAllproviderResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar empresa",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<CompanyType[]> = {
            status: "success",
            message: "empresa buscado com sucesso",
            data: getAllproviderResponce
        }
        return res.status(201).json(response)
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id do empresa nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }
        const getProviderResponce = await CompanyModel.get(id as string)
        if (!getProviderResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar empresa",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<CompanyType> = {
            status: "success",
            message: "empresa buscado com sucesso",
            data: getProviderResponce
        }
        return res.status(201).json(response)
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const newData: CompanyType = req.body
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
                message: "Dados de empresa invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const updateProviderResponse = await CompanyModel.update(id as string, newData)
        if (!updateProviderResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<CompanyType> = {
            status: "success",
            message: "empresa atualizado",
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

        const deleteuProviderResponse = await CompanyModel.delete(id as string)
        if (!deleteuProviderResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<CompanyType> = {
            status: "success",
            message: "empresa apagado",
            data: deleteuProviderResponse
        }
        return res.status(200).json(response)
    }
}
