import type { Request, Response } from "express"
import type { AcceptProposalType, ProposalType, ResponseType } from "../utils/types.js"
import { proposalModel } from "../models/proposta.models.js"



export const proposalControler = {
    async createProposal(req: Request, res: Response) {
        const newProposal: ProposalType = req.body
        if (!newProposal) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados Proposta invalido",
                data: null
            }
            return res.status(400).json(response)
        }
        const createProposalResponce = await proposalModel.create(newProposal)
        if (createProposalResponce === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar Proposta",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<ProposalType> = {
            status: "success",
            message: "Proposta criado com sucesso",
            data: createProposalResponce
        }
        return res.status(201).json(response)
    },
    async getAll(req: Request, res: Response) {
        const getAllProposalResponce = await proposalModel.getAll()
        if (!getAllProposalResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar Proposta",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<ProposalType[]> = {
            status: "success",
            message: "Proposta buscado com sucesso",
            data: getAllProposalResponce
        }
        return res.status(201).json(response)
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id do Proposta nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }
        const getProposalResponce = await proposalModel.get(id as string)
        if (!getProposalResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar Proposta",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<ProposalType> = {
            status: "success",
            message: "Proposta buscado co sucesso",
            data: getProposalResponce
        }
        return res.status(201).json(response)
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const newData: ProposalType = req.body
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
                message: "Dados de Proposta invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const updateProposalResponse = await proposalModel.update(id as string, newData)
        if (!updateProposalResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de Proposta invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<ProposalType> = {
            status: "success",
            message: "Proposta atualizado",
            data: updateProposalResponse
        }
        return res.status(200).json(response)
    },
    async acceptProposal(req: Request, res: Response) {
        const { id } = req.params
        try {
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatório",
                data: null
            }
            return res.status(400).json(response)
        }
        const result: AcceptProposalType[] | null = await proposalModel.acceptProposal(id as string);
        if (!result) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Proposta inválida ou não encontrada",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<AcceptProposalType[]> = {
            status: "success",
            message: "Proposta aceite com sucesso",
            data: result
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
    }
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

        const deleteuProposaltResponse = await proposalModel.delete(id as string)
        if (!deleteuProposaltResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar Proposta",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<ProposalType> = {
            status: "success",
            message: "Proposta apagado",
            data: deleteuProposaltResponse
        }
        return res.status(200).json(response)
    },
    async getByUserId(req: Request, res: Response) {
        const { idUser } = req.params
        if (!idUser) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }
        const getProposalResponce = await proposalModel.getByUserId(idUser as string)
        if (!getProposalResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar Proposta",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<ProposalType[]> = {
            status: "success",
            message: "Proposta buscado com sucesso",
            data: getProposalResponce
        }
        return res.status(201).json(response)
    }
}
