import type { Request, Response } from "express"
import type { ProposalType, ServiceProvType } from "../utils/types.js"
import { proposalModel } from "../models/proposta.models.js"
import { serviceProvModel } from "../models/prestacao_servico.models.js"


export const SPControler = {
    async createSP ( req: Request, res: Response) {
        const newSP: ServiceProvType = req.body
        if (!newSP) {
            return res.status(400).json({
                status: "error",
                message: "Dados Prestacao de servico invalido",
                data: null
            })
        }
        const createProposalResponce = await serviceProvModel.create(newSP)
        if (createProposalResponce === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar Prestacao de servico",
                data: null
            })
        }
        return res.status(201).json({
            status: "success",
            message: "Prestacao de servico criado com sucesso",
            data: createProposalResponce
        })
    },
    async getAll(req: Request, res: Response) {
        const getAllProposalResponce = await serviceProvModel.getAll()
        if (!getAllProposalResponce) {
            return res.status(500).json({
                status: "erro",
                message: "Erro ao buscar Prestacao de servico",
                data: null
            })
        }
        return res.status(201).json({
            status: "sucesso",
            message: "Prestacao de servico buscado co sucesso",
            data: getAllProposalResponce
        })
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "id do Prestacao de servico nao fornecido",
                data: null
            })
        }
        const getSPResponse = await serviceProvModel.get(id as string)
        if (!getSPResponse) {
            return res.status(500).json({
                status: "erro",
                message: "Erro ao buscar Prestacao de servico",
                data: null
            })
        }
        return res.status(201).json({
            status: "sucesso",
            message: "Prestacao de servico buscado co sucesso",
            data: getSPResponse
        })
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const newData: ServiceProvType = req.body
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
                mensage: "Dados de Prestacao de servico invalidos",
                data: null
            })
        }

        const updateProposalResponse = await serviceProvModel.update(id as string, newData)
        if (!updateProposalResponse) {
            return res.status(400).json({
                status: "error",
                mensage: "Dados de Prestacao de servico invalidos",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico atualizado",
            data: updateProposalResponse
        })
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensage: "ID obrigatorio",
                data: null
            })
        }
        const deleteuProposalResponse = serviceProvModel.delete(id as string)
        if (!deleteuProposalResponse) {
            return res.status(400).json({
                status: "error",
                mensage: "ID obrigatorio",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico apagado",
            data: deleteuProposalResponse
        })
    }
}
