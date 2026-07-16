import { CategoriaModel } from "../../models/categoria.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import { ServiceModel } from "../../models/servico.model.js";
import type { ServiceDBType } from "../../utils/types.js";

export const ServiceResolver = {
    Query: {
        getAllServices: async () => {
            return await ServiceModel.getAll();
        },
        getServiceById: async (_: any, args: { id: string }) => {
            return await ServiceModel.get(args.id);
        }
    },
    Mutation: {
        createService: async (_: any, args: { nome: string, descricao: string, categoria: string, enabled: boolean }) => {
            const newService: ServiceDBType = {
                id: "",
                nome: args.nome,
                descricao: args.descricao,
                categoria: args.categoria,
                enabled: args.enabled,
                updated_at: "",
                created_at: ""
            }
            return await ServiceModel.create(newService);
        },
        updateService: async (_: any, args: { id: string, nome: string, descricao: string, categoria: string, enabled: boolean }) => {
            const newService: ServiceDBType = {
                id: args.id,
                nome: args.nome,
                descricao: args.descricao,
                categoria: args.categoria,
                enabled: args.enabled,
                updated_at: "",
                created_at: ""
            }
            return await ServiceModel.update(args.id, newService);
        },
        deleteService: async (_: any, args: { id: string }) => {
            return await ServiceModel.delete(args.id);
        }
    },
    // Relacionamentos de tabelas
    service: {
        categoria: async (parent: { id: string }) => {
            return await CategoriaModel.get(parent.id);
        }
    },
    serviceProv: async (parent: { id: string }) => {
        return await PrestadorModel.get(parent.id);
    }
}
