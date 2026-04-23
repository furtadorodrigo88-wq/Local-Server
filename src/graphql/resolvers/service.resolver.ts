import { CategoryModel } from "../../models/categoria.model.js";
import { serviceProvModel } from "../../models/prestacao_servico.models.js";
import { ServiceModel } from "../../models/servico.model.js";
import type { Servicetype } from "../../utils/types.js";


export const ServiceResolver = {
    Query: {
        getAllServices: async () => {
            return await ServiceModel.getAll();
        },
        getServiceById: async (_: any, args: {id: string}) => {
            return await ServiceModel.get(args.id);
        }
    },
    Mutation: {
        createService: async (_: any, args: {newUser: Servicetype}) => {
            return await ServiceModel.create(args.newUser);
        },
        updateService: async (_: any, args: {id: string, newUser: Servicetype}) => {
            return await ServiceModel.update(args.id, args.newUser);
        },
        deleteService: async (_: any, args: {id: string}) => {
            return await ServiceModel.delete(args.id);
        }
    },
    // Relacionamentos de tabelas
    service: {
        categoria: async (parent: {id: string}) => {
            return await CategoryModel.get(parent.id);
        }
    },
        serviceProv: async (parent: {id: string}) => {
            return await serviceProvModel.get(parent.id);
    }
}
