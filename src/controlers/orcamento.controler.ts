import type { Request, Response } from "express"
import { Estadoproposta, type BudgetType, type ProposalType, type ResponseType } from "../utils/types.js"
import { budgetModel } from "../models/orcamentos.model.js"
import { ProviderModel } from "../models/prestador.model.js"
import { serviceProvModel } from "../models/prestacao_servico.models.js"
import { proposalModel } from "../models/proposta.models.js"


export const budgetControler = {
    async createBudget(req: Request, res: Response) {
        const newProvider: BudgetType = req.body
        if (!newProvider) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados Orcamento invalido",
                data: null
            }
            return res.status(400).json(response)
        }
        const createBudgetResponce: BudgetType | null = await budgetModel.create(newProvider)
        if (createBudgetResponce === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<BudgetType> = {
            status: "success",
            message: "orcamento criado com sucesso",
            data: createBudgetResponce
        }
        return res.status(201).json(response)
    },
    async getAll(req: Request, res: Response) {
        const getAllBudgetResponce: BudgetType[] | null = await budgetModel.getAll()
        if (!getAllBudgetResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar orcamento",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<BudgetType[]> = {
            status: "success",
            message: "orcamento buscado co sucesso",
            data: getAllBudgetResponce
        }
        return res.status(201).json(response)
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id do orcamento nao fornecido",
                data: null
            }
            return res.status(400).json(response)
        }
        const getBudgetResponce = await budgetModel.get(id as string)
        if (!getBudgetResponce) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar orcamento",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<BudgetType> = {
            status: "success",
            message: "orcamento buscado co sucesso",
            data: getBudgetResponce
        }
        return res.status(201).json(response)
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const newData: BudgetType = req.body
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
                message: "Dados de orcamento invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const updateBudgetResponse = await budgetModel.update(id as string, newData)
        if (!updateBudgetResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<BudgetType> = {
            status: "success",
            message: "orcamento atualizado",
            data: updateBudgetResponse
        }
        return res.status(200).json(response)
    },
    async calculateBudget(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }
        const prestacaoDeServico = await serviceProvModel.getByOrcamento(id as string)
        if (!prestacaoDeServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestaçao de servico nao encontrada",
                data: null
            }
            return res.status(400).json(response)
        }
        const proposta = await proposalModel.getByServceProv(prestacaoDeServico.id)
        if (!proposta) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Proposta nao encontrada",
                data: null
            }
            return res.status(400).json(response)
        }
        const acceptedproposal: ProposalType | undefined = proposta.find((proposta:ProposalType) => proposta.estado === Estadoproposta.ACEITE)
        if (!acceptedproposal) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ainda nenhuma proposta foi aceite",
                data: null
            }
            return res.status(400).json(response)
        }
        const precoHora = parseFloat(acceptedproposal.preco_hora)
        const horasEstimadas = parseFloat(acceptedproposal.horas_estimadas)
        const prestador = await ProviderModel.get(acceptedproposal.id_prestador)
        if (!prestador) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestador nao encontrado",
                data: null
            }
            return res.status(400).json(response)
        }
        const taxaUrgencia = prestador.taxaUrgencia
        const minimoDesconto = prestador.minimoDesconto
        const percentagemDesconto = prestador.percentagemDesconto
        let subtotal = precoHora * horasEstimadas
        if (subtotal > minimoDesconto){
            subtotal =subtotal * (1 - percentagemDesconto)
        }
        if (prestacaoDeServico.urgente){
            subtotal = subtotal * (1 + taxaUrgencia)
        }
        const updateBudgetResponse = await budgetModel.updateBudget (id as string, subtotal)
        if (!updateBudgetResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao calcular orcamento",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<BudgetType> ={
            status: "success",
            message: "orcamento calculado e atualizado com sucesso",
            data: updateBudgetResponse
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
        const deleteuBudgetResponse = await budgetModel.delete(id as string)
        if (!deleteuBudgetResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<BudgetType[]> = {
            status: "success",
            message: "orcamento apagado",
            data: deleteuBudgetResponse
        }
        return res.status(200).json(response)
    }
}
