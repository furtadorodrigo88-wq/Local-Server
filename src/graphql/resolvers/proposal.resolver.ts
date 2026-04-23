import { serviceProvModel } from "../../models/prestacao_servico.models.js";
import { proposalModel } from "../../models/proposta.models.js";
import type { ProposalType } from "../../utils/types.js";




export const ProposalResolver = {
    Query: {
        getAllProposals: async () => {
            return await proposalModel.getAll();
        },
        getProposalById: async (_: any, args: {id: string}) => {
            return await proposalModel.get(args.id);
        }
    },
    Mutation: {
        createProposal: async (_: any, args: {newUser: ProposalType}) => {
            return await proposalModel.create(args.newUser);
        },
        updateProposal: async (_: any, args: {id: string, newUser: ProposalType}) => {
            return await proposalModel.update(args.id, args.newUser);
        },
        deleteProposal: async (_: any, args: {id: string}) => {
            return await proposalModel.delete(args.id);
        }
    },
    // Relacionamentos de tabelas
    proposal: {
        serviceProv: async (parent: {id: string}) => {
            return await serviceProvModel.get(parent.id);
        }
    }
}