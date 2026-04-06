import { ServiceModel } from "../models/servico.model.js"
import type { Servicetype } from "../utils/types.js"
import type { Request, Response } from "express"

export const servicoControler = {
    async createService( req: Request, res: Response) {
        const newService: Servicetype = req.body
        if (!newService) {
            return res.status(400).json({
                status: "error",
                message: "Dados servico invalido",
                data: null
            })
        }
        const createServeceResponse = await ServiceModel.create(newService)
        if (createServeceResponse === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar servico",
                data: null
            })
        }
        return res.status(201).json({
            status: "success",
            message: "Servico criado com sucesso",
            data: createServeceResponse
        })
    },
    async getAll(req: Request, res: Response) {
        const getAllServiceResponce = await ServiceModel.getAll()
        if (!getAllServiceResponce) {
            return res.status(500).json({
                status: "erro",
                message: "Erro ao buscar servico",
                data: null
            })
        }
        return res.status(201).json({
            status: "sucesso",
            message: "Servico buscado co sucesso",
            data: getAllServiceResponce
        })
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "id do servico nao fornecido",
                data: null
            })
        }
        const getServiceResponse = await ServiceModel.get(id as string)
        if (!getServiceResponse) {
            return res.status(500).json({
                status: "erro",
                message: "Erro ao buscar servico",
                data: null
            })
        }
        return res.status(201).json({
            status: "sucesso",
            message: "Servico buscado co sucesso",
            data: getServiceResponse
        })
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const newData: Servicetype = req.body
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
                mensage: "Dados de servico invalidos",
                data: null
            })
        }

        const updateServiceResponse = await ServiceModel.update(id as string, newData)
        if (!updateServiceResponse) {
            return res.status(400).json({
                status: "error",
                mensage: "Dados de servico invalidos",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Servico atualizado",
            data: updateServiceResponse
        })
    },
    async delete(req: Request, res:Response) {
        const { id } = req.params
        
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    mensage: "ID obrigatorio",
                    data: null
                })
            }
        
            const deleteuserviceResponse = ServiceModel.delete (id as string)
            if (!deleteuserviceResponse) {
                return res.status(400).json({
                    status: "error",
                    mensage: "ID obrigatorio",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Servico apagado",
                data: deleteuserviceResponse
        })
    }
}

