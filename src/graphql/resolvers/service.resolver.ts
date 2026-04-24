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
        createService: async (_: any, args: {nome: string, descricao: string, categoria: string, enabled: boolean}) => {
            const newService: Servicetype = {
                id: "",
                nome: args.nome,
                descricao: args.descricao,
                categoria: args.categoria,
                enabled: args.enabled,
                updated_et: "",
                created_at: ""
            }
            return await ServiceModel.create(newService);
        },
        updateService: async (_: any, args: {id: string, nome: string, descricao: string, categoria: string, enabled: boolean}) => {
            const newService: Servicetype = {
                id: args.id,
                nome: args.nome,
                descricao: args.descricao,
                categoria: args.categoria,
                enabled: args.enabled,
                updated_et: "",
                created_at: ""
            }
            return await ServiceModel.update(args.id, newService);
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
