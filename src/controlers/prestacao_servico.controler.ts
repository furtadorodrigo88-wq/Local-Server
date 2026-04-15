import type { Request, Response } from "express"
import type { ProposalType, ResponseType, serviceProvDetailsType, ServiceProvType } from "../utils/types.js"
import { serviceProvModel } from "../models/prestacao_servico.models.js"


export const SPControler = {
    async createSP(req: Request, res: Response) {
        const newSP: ServiceProvType = req.body
        if (!newSP) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados Prestacao de servico invalido",
                data: null
            }
            return res.status(400).json(response)
        }
        const createProposalResponce: ServiceProvType | null = await serviceProvModel.create(newSP)
        if (createProposalResponce === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar Prestacao de servico",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<ServiceProvType> = {
            status: "success",
            message: "Prestacao de servico criado com sucesso",
            data: createProposalResponce
        }
        return res.status(201).json(response)
    },
    async getAll(req: Request, res: Response) {
        const getAllProposalResponce: ServiceProvType[] | null = await serviceProvModel.getAll()
        if (!getAllProposalResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar Prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<ServiceProvType[]> = {
            status: "success",
            message: "Prestacao de servico buscado co sucesso",
            data: getAllProposalResponce
        }
        return res.status(201).json(response)
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id do Prestacao de servico nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }
        const getSPResponse: ServiceProvType | null = await serviceProvModel.get(id as string)
        if (!getSPResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar Prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<ServiceProvType> = {
            status: "success",
            message: "Prestacao de servico buscado co sucesso",
            data: getSPResponse
        }
        return res.status(201).json(response)
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const newData: ServiceProvType = req.body
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id do Prestacao de servico nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }

        if (!newData) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de Prestacao de servico invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const updateProposalResponse: ServiceProvType | null = await serviceProvModel.update(id as string, newData)
        if (!updateProposalResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de Prestacao de servico invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<ServiceProvType> = {
            status: "success",
            message: "Prestacao de servico atualizado",
            data: updateProposalResponse
        }
        return res.status(200).json(response)
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id do Prestacao de servico nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }
        const deleteuProposalResponse = await serviceProvModel.delete(id as string)
        if (!deleteuProposalResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao deletar Prestacao de servico",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<ServiceProvType> = {
            status: "success",
            message: "Prestacao de servico apagado",
            data: deleteuProposalResponse
        }
        return res.status(200).json(response)
    },
    async getAllServiceProvDetails(req: Request, res: Response) {
        const { limit, offset } = req.query as { limit: string, offset: string }
        let LIMIT = 10
        let OFFSET = 0
        if (limit && parseInt(limit) > 10) LIMIT = parseInt(limit)
        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)
        const getAllServiceProvDetailsResponse = await serviceProvModel.getAllserviceProvDetails(LIMIT, OFFSET)
        if (!getAllServiceProvDetailsResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar Prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<serviceProvDetailsType[]> = {
            status: "success",
            message: "Prestacao de servico buscado co sucesso",
            data: getAllServiceProvDetailsResponse
        }
        return res.status(201).json(response)
    },
    async getAllServiceProvByCategoria (req: Request, res: Response) {
        const { id_categoria } = req.params
        const { limit, offset } = req.query as { limit: string, offset: string }
        let LIMIT = 10
        let OFFSET = 0
        if (limit && parseInt(limit) > 10) LIMIT = parseInt(limit)
        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)
        const getAllServiceProvByCategoriaResponse = await serviceProvModel.getAllServiceProvByCategoria(id_categoria as string, LIMIT, OFFSET)
        if (!getAllServiceProvByCategoriaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar Prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<serviceProvDetailsType[]> = {
            status: "success",
            message: "Prestacao de servico buscado co sucesso",
            data: getAllServiceProvByCategoriaResponse
        }
        return res.status(201).json(response)
    }
}
