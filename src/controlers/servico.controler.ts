import { ServiceModel } from "../models/servico.model.js"
import type { ResponseType, ServiceDetaltype, Servicetype } from "../utils/types.js"
import type { Request, Response } from "express"

export const servicoControler = {
    async createService( req: Request, res: Response) {
        const newService: Servicetype = req.body
        if (!newService) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados servico invalido",
                data: null
            }
            return res.status(400).json(response)
        }
        const createServeceResponse = await ServiceModel.create(newService)
        if (createServeceResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar servico",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<Servicetype> = {
            status: "success",
            message: "Servico criado com sucesso",
            data: createServeceResponse
        }
        return res.status(201).json(response)
    },
    async getAll(req: Request, res: Response) {
        const getAllServiceResponce = await ServiceModel.getAll()
        if (!getAllServiceResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<Servicetype[]> = {
            status: "success",
            message: "Servico buscado co sucesso",
            data: getAllServiceResponce
        }
        return res.status(201).json(response)
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id do servico nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }
        const getServiceResponse = await ServiceModel.get(id as string)
        if (!getServiceResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<Servicetype> = {
            status: "success",
            message: "Servico buscado co sucesso",
            data: getServiceResponse
        }
        return res.status(201).json(response)
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const newData: Servicetype = req.body
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
                message: "Dados de servico invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const updateServiceResponse = await ServiceModel.update(id as string, newData)
        if (!updateServiceResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de servico invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<Servicetype> = {
            status: "success",
            message: "Servico atualizado",
            data: updateServiceResponse
        }
        return res.status(200).json(response)
    },
    async delete(req: Request, res:Response) {
        const { id } = req.params
        
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID obrigatorio",
                    data: null
                }
                return res.status(400).json(response)
            }
        
            const deleteuserviceResponse: Servicetype | null = await ServiceModel.delete (id as string)
            if (!deleteuserviceResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID obrigatorio",
                    data: null
                }
                return res.status(400).json(response)
            }
            const response: ResponseType<Servicetype> = {
                status: "success",
                message: "Servico apagado",
                data: deleteuserviceResponse
            }
            return res.status(200).json(response)
    },
    async getAllServicesDetailed(req: Request, res: Response) {
        const { limit, offset } = req.query

        let LIMIT = 10
        let OFFSET = 0

        if (limit) {
            LIMIT = parseInt(limit as string)
        }
        if (offset) {
            OFFSET = parseInt(offset as string)
        }
        const getAllServiceDetalhadoResponse = await ServiceModel.getALLServicesDetailed(LIMIT, OFFSET)
        if (!getAllServiceDetalhadoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<ServiceDetaltype[]> = {
            status: "success",
            message: "Servico buscado co sucesso",
            data: getAllServiceDetalhadoResponse
        }
        return res.status(201).json(response)
    }
}

