import { budgetModel } from "../../models/orcamentos.model.js";
import { serviceProvModel } from "../../models/prestacao_servico.models.js";
import { UserModel } from "../../models/users.model.js";
import type { BudgetType } from "../../utils/types.js";



export const BudgetResolver = {
    Query: {
        getAllBudgets: async () => {
            return await budgetModel.getAll();
        },
        getBudgetById: async (_: any, args: {id: string}) => {
            return await budgetModel.get(args.id);
        }
    },
    Mutation: {
        createBudget: async (_: any, args: {newUser: BudgetType}) => {
            return await budgetModel.create(args.newUser);
        },
        updateBudget: async (_: any, args: {id: string, newUser: BudgetType}) => {
            return await budgetModel.update(args.id, args.newUser);
        },
        deleteBudget: async (_: any, args: {id: string}) => {
            return await budgetModel.delete(args.id);
        }
    },
    // Relacionamentos de tabelas
    budget: {
        serviceProv: async (parent: {id: string}) => {
            return await serviceProvModel.get(parent.id);
        },
        user: async (parent: {id: string}) => {
            return await UserModel.get(parent.id);
        }
    }
}