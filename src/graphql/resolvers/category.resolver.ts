import { CategoryModel } from "../../models/categoria.model.js";
import { ServiceModel } from "../../models/servico.model.js";
import type { CategoryType } from "../../utils/types.js";



export const CategoryResolver = {
    Query: {
        getAllCategories: async () => {
            return await CategoryModel.getAll();
        },
        getCategoryById: async (_: any, args: {id: string}) => {
            return await CategoryModel.get(args.id);
        }
    },
    Mutation: {
        createCategory: async (_: any, args: {newUser: CategoryType}) => {
            return await CategoryModel.create(args.newUser);
        },
        updateCategory: async (_: any, args: {id: string, newUser: CategoryType}) => {
            return await CategoryModel.update(args.id, args.newUser);
        },
        deleteCategory: async (_: any, args: {id: string}) => {
            return await CategoryModel.delete(args.id);
        }
    },
    // Relacionamentos de tabelas
    category: {
        service: async (parent: {id: string}) => {
            return await ServiceModel.get(parent.id);
        }
    }
}