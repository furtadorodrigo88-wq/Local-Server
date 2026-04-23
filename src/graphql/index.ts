import { typeDefs } from "./typedefs/typedefs.js";
import { userResolver } from "./resolvers/users.resolver.js";
import { ServiceResolver } from "./resolvers/service.resolver.js";
import { ProviderResolver } from "./resolvers/provider.resolver.js";
import { CategoryResolver } from "./resolvers/category.resolver.js";
import { CompanyResolver } from "./resolvers/company.resolver.js";
import { BudgetResolver } from "./resolvers/budget.resolver.js";
import { ProposalResolver } from "./resolvers/proposal.resolver.js";
import { ServiceProvResolver } from "./resolvers/service-prov.resolver.js";


export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...ServiceResolver.Query,
        ...CategoryResolver.Query,
        ...ProviderResolver.Query,
        ...CompanyResolver.Query,
        ...BudgetResolver.Query,
        ...ProposalResolver.Query,
        ...ServiceProvResolver.Query,
    },
    Mutation: {
        ...userResolver.Mutation,
        ...ServiceResolver.Mutation,
        ...CategoryResolver.Mutation,
        ...ProviderResolver.Mutation,
        ...CompanyResolver.Mutation,
        ...BudgetResolver.Mutation,
        ...ProposalResolver.Mutation,
        ...ServiceProvResolver.Mutation,
    }
}

export { typeDefs }