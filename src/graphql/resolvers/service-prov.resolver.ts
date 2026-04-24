import { budgetModel } from "../../models/orcamentos.model.js";
import { serviceProvModel } from "../../models/prestacao_servico.models.js";
import { ProviderModel } from "../../models/prestador.model.js";
import { proposalModel } from "../../models/proposta.models.js";
import { ServiceModel } from "../../models/servico.model.js";
import type { ServiceProvType } from "../../utils/types.js";



export const ServiceProvResolver = {
    Query: {
        getAllServiceProv: async () => {
            return await serviceProvModel.getAll();
        },
        getServiceProvById: async (_: any, args: {id: string}) => {
            return await serviceProvModel.get(args.id);
        }
    },
    Mutation: {
        createServiceProv: async (_: any, args: {serviceProv: ServiceProvType}) => {
            return await serviceProvModel.create(args.serviceProv);
        },
        updateServiceProv: async (_: any, args: {id: string, newServiceProv: ServiceProvType}) => {
            return await serviceProvModel.update(args.id, args.newServiceProv);
        },
        deleteServiceProv: async (_: any, args: {id: string}) => {
            return await serviceProvModel.delete(args.id);
        }
    },
    // Relacionamentos de tabelas
    serviceProv: {
        servico: async (parent: {id: string}) => {
            return await ServiceModel.get(parent.id);
        },
        budget: async (parent: {id: string}) => {
            return await budgetModel.get(parent.id);
        },
        prestador: async (parent: {id: string}) => {
            return await ProviderModel.get(parent.id);
        },
        proposta: async (parent: {id: string}) => {
            return await proposalModel.get(parent.id);
        }
    }
}