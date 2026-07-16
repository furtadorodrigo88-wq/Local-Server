import { UsersModel } from "../../models/users.model.js";
import { EmpresaModel } from "../../models/empresa.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import type { UserDBType, userType } from "../../utils/types.js";

export const UsersResolver = {
    Query: {
        getAllUsers: async () => {
            return await UsersModel.getAll();
        },
        getUserById: async (_: any, args: { id: string }) => {
            return await UsersModel.get(args.id);
        }
    },
    Mutation: {
        createUser: async (_: any, args: { user: userType }) => {
            return await UsersModel.create(args.user);
        },
        updateUser: async (_: any, args: { id: string, user: userType }) => {
            return await UsersModel.update(args.id, args.user);
        },
        deleteUser: async (_: any, args: { id: string }) => {
            return await UsersModel.delete(args.id);
        }
    },
    User: {
        empresa: async (parent: UserDBType) => {
            return await EmpresaModel.get(parent.id!);
        },
        prestador: async (parent: UserDBType) => {
            return await PrestadorModel.get(parent.id!);
        }
    }
}
