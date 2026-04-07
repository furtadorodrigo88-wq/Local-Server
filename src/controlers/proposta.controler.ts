import type { Request, Response } from "express"
import type { ProposalType } from "../utils/types.js"
import { proposalModel } from "../models/proposta.models.js"



export const proposalControler = {
    async createProposal ( req: Request, res: Response) {
        const newProposal: ProposalType = req.body
        if (!newProposal) {
            return res.status(400).json({
                status: "error",
                message: "Dados Proposta invalido",
                data: null
            })
        }
        const createProposalResponce = await proposalModel.create(newProposal)
        if (createProposalResponce === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar Proposta",
                data: null
            })
        }
        return res.status(201).json({
            status: "success",
            message: "Proposta criado com sucesso",
            data: createProposalResponce
        })
    },
    async getAll(req: Request, res: Response) {
        const getAllProposalResponce = await proposalModel.getAll()
        if (!getAllProposalResponce) {
            return res.status(500).json({
                status: "erro",
                message: "Erro ao buscar Proposta",
                data: null
            })
        }
        return res.status(201).json({
            status: "sucesso",
            message: "Proposta buscado com sucesso",
            data: getAllProposalResponce
        })
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "id do Proposta nao fornecido",
                data: null
            })
        }
        const getProposalResponce = await proposalModel.get(id as string)
        if (!getProposalResponce) {
            return res.status(500).json({
                status: "erro",
                message: "Erro ao buscar Proposta",
                data: null
            })
        }
        return res.status(201).json({
            status: "sucesso",
            message: "Proposta buscado co sucesso",
            data: getProposalResponce
        })
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const newData: ProposalType = req.body
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
                mensage: "Dados de Proposta invalidos",
                data: null
            })
        }

        const updateProposalResponse = await proposalModel.update(id as string, newData)
        if (!updateProposalResponse) {
            return res.status(400).json({
                status: "error",
                mensage: "Dados de Proposta invalidos",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Proposta atualizado",
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

        const deleteuProposaltResponse = proposalModel.delete(id as string)
        if (!deleteuProposaltResponse) {
            return res.status(400).json({
                status: "error",
                mensage: "ID obrigatorio",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Proposta apagado",
            data: deleteuProposaltResponse
        })
    }
}
