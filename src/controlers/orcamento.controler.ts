import type { Request, Response } from "express"
import type { BudgetType } from "../utils/types.js"
import { budgetModel } from "../models/orcamentos.model.js"


export const budgetControler = {
    async createBudget (req: Request, res: Response) {
        const newProvider: BudgetType = req.body
        if (!newProvider) {
            return res.status(400).json({
                status: "error",
                message: "Dados Orcamento invalido",
                data: null
            })
        }
        const createBudgetResponce = await budgetModel.create(newProvider)
        if (createBudgetResponce === null) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            })
        }
        return res.status(201).json({
            status: "success",
            message: "orcamento criado com sucesso",
            data: createBudgetResponce
        })
    },
    async getAll(req: Request, res: Response) {
        const getAllBudgetResponce = await budgetModel.getAll()
        if (!getAllBudgetResponce) {
            return res.status(500).json({
                status: "erro",
                message: "Erro ao buscar orcamento",
                data: null
            })
        }
        return res.status(201).json({
            status: "sucesso",
            message: "orcamento buscado co sucesso",
            data: getAllBudgetResponce
        })
    },
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "id do orcamento nao fornecido",
                data: null
            })
        }
        const getBudgetResponce = await budgetModel.get(id as string)
        if (!getBudgetResponce) {
            return res.status(500).json({
                status: "erro",
                message: "Erro ao buscar orcamento",
                data: null
            })
        }
        return res.status(201).json({
            status: "sucesso",
            message: "orcamento buscado co sucesso",
            data: getBudgetResponce
        })
    },
    async update(req: Request, res: Response) {
        const { id } = req.query
        const newData: BudgetType = req.body
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
                mensage: "Dados de orcamento invalidos",
                data: null
            })
        }
        const updateBudgetResponse = await budgetModel.update(id as string, newData)
        if (!updateBudgetResponse) {
            return res.status(400).json({
                status: "error",
                mensage: "Dados de orcamento invalidos",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "orcamento atualizado",
            data: updateBudgetResponse
        })
    },
    async calculateBudget(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID obrigatório",
            data: null
        });
    }
    const result = await budgetModel.calculateBudget(id);
    if (!result) {
        return res.status(400).json({
            status: "error",
            message: "Dados de orçamento inválidos",
            data: null
        });
    }
    return res.status(200).json({
        status: "success",
        message: "Orçamento calculado com sucesso",
        data: result
    });
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
        const deleteuBudgetResponse = budgetModel.delete(id as string)
        if (!deleteuBudgetResponse) {
            return res.status(400).json({
                status: "error",
                mensage: "ID obrigatorio",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "orcamento apagado",
            data: deleteuBudgetResponse
        })
    }
}
