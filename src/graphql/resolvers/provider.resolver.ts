import { serviceProvModel } from "../../models/prestacao_servico.models.js";
import { ProviderModel } from "../../models/prestador.model.js";
import type { ProvaiderType } from "../../utils/types.js";



export const ProviderResolver = {
    Query: {
        getAllProviders: async () => {
            return await ProviderModel.getAll();
        },
        getProviderById: async (_: any, args: {id: string}) => {
            return await ProviderModel.get(args.id);
        }
    },
    Mutation: {
        createProvider: async (_: any, args: {newUser: ProvaiderType}) => {
            return await ProviderModel.create(args.newUser);
        },
        updateProvider: async (_: any, args: {id: string, newUser: ProvaiderType}) => {
            return await ProviderModel.update(args.id, args.newUser);
        },
        deleteProvider: async (_: any, args: {id: string}) => {
            return await ProviderModel.delete(args.id);
        }
    },
    // Relacionamentos de tabelas
    provider: {
        serviceProv: async (parent: {id: string}) => {
            return await serviceProvModel.get(parent.id);
        }
    }
}