import { ProviderModel } from "../models/prestador.model.js"
import type { ProvaiderType } from "../utils/types.js"
import type { Request, Response } from "express"


export const provaiderControler = {
    async createProvider( req: Request, res: Response) {
        const newProvider: ProvaiderType = req.body
        if (!newProvider) {
            return res.status(400).json({
                status: "error",
                message: "Dados Provedor invalido",
                data: null
            })
        }
        const createProviderResponse = await ProviderModel.create(newProvider)
        if (createProviderResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar prestador",
                data: null
            })
        }
        return res.status(201).json({
            status: "success",
            message: "Prestador criado com sucesso",
            data: createProviderResponse
        })
    },
    async getAll(req: Request, res: Response) {
        const getAllproviderResponce = await ProviderModel.getAll()
        if (!getAllproviderResponce) {
            return res.status(500).json({
                status: "erro",
                message: "Erro ao buscar prestador",
                data: null
            })
        }
        return res.status(201).json({
            status: "sucesso",
            message: "Prestador buscado co sucesso",
            data: getAllproviderResponce
        })
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "id do prestador nao fornecido",
                data: null
            })
        }
        const getProviderResponce = await ProviderModel.get(id as string)
        if (!getProviderResponce) {
            return res.status(500).json({
                status: "erro",
                message: "Erro ao buscar prestador",
                data: null
            })
        }
        return res.status(201).json({
            status: "sucesso",
            message: "prestador buscado co sucesso",
            data: getProviderResponce
        })
    },
    async update(req: Request, res: Response) {
        const { id } = req.query
        const newData: ProvaiderType = req.body
        if (!id) {
            return res.status(400).json({
                status: "error",
                mensage: "ID obrigatorio",
                data: null
            })
        }

        if (!newData) {
            return res.status(400).json({
                status: "error",
                mensage: "Dados de prestador invalidos",
                data: null
            })
        }

        const updateProviderResponse = await ProviderModel.update(id as string, newData)
        if (!updateProviderResponse) {
            return res.status(400).json({
                status: "error",
                mensage: "Dados de prestador invalidos",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestador atualizado",
            data: updateProviderResponse
        })
    },
    async delete(req: Request, res: Response) {
        const { id } = req.query

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensage: "ID obrigatorio",
                data: null
            })
        }

        const deleteuProviderResponse = ProviderModel.delete(id as string)
        if (!deleteuProviderResponse) {
            return res.status(400).json({
                status: "error",
                mensage: "ID obrigatorio",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestador apagado",
            data: deleteuProviderResponse
        })
    }
}
