import { CompanyModel } from "../../models/empresa.model.js";
import { UserModel } from "../../models/users.model.js";
import type { CompanyType } from "../../utils/types.js";



export const CompanyResolver = {
    Query: {
        getAllCompanies: async () => {
            return await CompanyModel.getAll();
        },
        getCompanyById: async (_: any, args: {id: string}) => {
            return await CompanyModel.get(args.id);
        }
    },
    Mutation: {
        createCompany: async (_: any, args: {newUser: CompanyType}) => {
            return await CompanyModel.create(args.newUser);
        },
        updateCompany: async (_: any, args: {id: string, newUser: CompanyType}) => {
            return await CompanyModel.update(args.id, args.newUser);
        },
        deleteCompany: async (_: any, args: {id: string}) => {
            return await CompanyModel.delete(args.id);
        }
    },
    // Relacionamentos de tabelas
    company: {
        user: async (parent: {id: string}) => {
            return await UserModel.get(parent.id);
        }
    }
}