import { ProviderModel } from "../models/prestador.model.js"
import type { ProvaiderType, ResponseType } from "../utils/types.js"
import type { Request, Response } from "express"


export const provaiderControler = {
    async createProvider( req: Request, res: Response) {
        const newProvider: ProvaiderType = req.body
        if (!newProvider) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados Provedor invalido",
                data: null
            }
            return res.status(400).json(response)
        }
        const createProviderResponse = await ProviderModel.create(newProvider)
        if (createProviderResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar prestador",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<ProvaiderType> = {
            status: "success",
            message: "Prestador criado com sucesso",
            data: createProviderResponse
        }
        return res.status(201).json(response)
    },
    async getAll(req: Request, res: Response) {
        const getAllproviderResponce = await ProviderModel.getAll()
        if (!getAllproviderResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestador",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<ProvaiderType[]> = {
            status: "success",
            message: "Prestador buscado co sucesso",
            data: getAllproviderResponce
        }
        return res.status(201).json(response)
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id do prestador nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }
        const getProviderResponce = await ProviderModel.get(id as string)
        if (!getProviderResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestador",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<ProvaiderType> = {
            status: "success",
            message: "prestador buscado co sucesso",
            data: getProviderResponce
        }
        return res.status(201).json(response)
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const newData: ProvaiderType = req.body
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
                message: "Dados de prestador invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const updateProviderResponse = await ProviderModel.update(id as string, newData)
        if (!updateProviderResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de prestador invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<ProvaiderType> = {
            status: "success",
            message: "prestador atualizado",
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

        const deleteuProviderResponse = await ProviderModel.delete(id as string)
        if (!deleteuProviderResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<ProvaiderType> = {
            status: "success",
            message: "prestador apagado",
            data: deleteuProviderResponse
        }
        return res.status(200).json(response)
    },

    async getPrecoHora(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        const getPrecoHoraResponse = await ProviderModel.getPrecoHora(id as string)
        if (!getPrecoHoraResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar preco hora",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<ProvaiderType> = {
            status: "success",
            message: "preco hora buscado co sucesso",
            data: getPrecoHoraResponse
        }
        return res.status(201).json(response)
    }
}
