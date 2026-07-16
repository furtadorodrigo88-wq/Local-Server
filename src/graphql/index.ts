import { typeDefs } from "./typedefs/typedefs.js";
import { UsersResolver } from "./resolvers/users.resolver.js";
import { ServiceResolver } from "./resolvers/service.resolver.js";
import { prestacaoServicoResolver } from "./resolvers/prestacao-servico.resolver.js";
import { PrestadorResolver } from "./resolvers/prestador.resolver.js";
import { OrcamentoResolver } from "./resolvers/orcamento.resolver.js";
import { EmpresaResolver } from "./resolvers/empresa.resolver.js";
import { CategoriaResolver } from "./resolvers/categoria.resolver.js";
import { PropostaResolver } from "./resolvers/proposta.resolver.js";

// ********** exportar todos os resolvers **********
export const resolvers = {
    Query: {
        ...UsersResolver.Query,
        ...ServiceResolver.Query,
        ...PropostaResolver.Query,
        ...PrestadorResolver.Query,
        ...prestacaoServicoResolver.Query,
        ...OrcamentoResolver.Query,
        ...EmpresaResolver.Query,
        ...CategoriaResolver.Query,
    },
    Mutation: {
        ...UsersResolver.Mutation,
        ...ServiceResolver.Mutation,
        ...PropostaResolver.Mutation,
        ...PrestadorResolver.Mutation,
        ...prestacaoServicoResolver.Mutation,
        ...OrcamentoResolver.Mutation,
        ...EmpresaResolver.Mutation,
        ...CategoriaResolver.Mutation,
    }
}

export { typeDefs } 
