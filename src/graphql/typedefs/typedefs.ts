import { gql } from "graphql-tag";


export const typeDefs = gql`
    enum Role {
        CLIENTE,
        PRESTADOR,
        ADMIN,
        EMPRESA
    }
    enum EstadoPrestacao {
        PENDENTE,
        EM_PROGRESSO,
        FINALIZADO,
        CANCELADO
    }
    enum TipoPrestador {
        PARTICULAR,
        EMPRESA
    }
    enum EstadoProposta {
        PENDENTE,
        ACEITE,
        CANCELADO
    }
    type User {
        id: ID!,
        nome: String!,
        numero: String!,
        data_nascimento: String!,
        email: String!,
        telefone: String!,
        pais: String!,
        localidade: String!,
        password: String!,
        role: Role!,
        enabled: Boolean!,
        updated_et: String!,
        created_at: String!
    }
    type Proposal {
        id: ID!
        id_prestacao_servico: ServiceProv!
        preco_hora: String!
        horas_estimadas: String!
        owner: String!
        estado: String!
        enabled: Boolean!
        created_at: String!
        updated_at: String!
        id_prestador: Provaider!
    }
    type Service {
        id: ID!
        nome: String!
        descricao: String!
        categoria: String!
        enabled: Boolean!
        updated_et: String!
        created_at: String!
    }
    type Provaider {
        id: ID!
        nif: Int!
        profissao: String!
        minimoDesconto: Float!
        taxaUrgencia: Float!
        percentagemDesconto: Float!
        estado: Boolean!
        enabled: Boolean!
        created_at: String!
        updated_at: String!
    }
    type Budget {
        id: ID!
        total: String!
        id_utilizadores: User!
        enabled: Boolean!
        created_at: String!
        updated_at: String!
    }
    type ServiceProv {
        id: ID!
        disign: String!
        subtotal: Float!
        horas_estimadas: Float!
        id_prestador: Provaider!
        id_servico: Service!
        preco_hora: Float!
        estado: String!
        id_orcamento: Budget!
        id_utilizador: User!
        urgente: Boolean!
        enabled: Boolean!
        created_at: String!
        updated_at: String!
    }
    type Category {
        id: ID!
        designacao: String!
        icone: String!
        created_at: String!
        updated_at: String!
    }
    type Company {
        id: ID!
        designacao: String!
        descricao: String!
        nif: Int!
        icone: String!
        id_utilizador: User!
        localizacao: String!
        enabled: Boolean!
        updated_et: String!
        created_at: String!
    }

    input serviceprovImputcreate{
        disign: String!
        subtotal: Float!
        horas_estimadas: Float!
        id_prestador: String!
        id_servico: String!
        preco_hora: Float!
        estado: String!
        id_orcamento: String!
        id_utilizador: String!
        urgente: Boolean!
        enabled: Boolean!
        created_at: String!
        updated_at: String!
    }
    input serviceprovImputupdate{
        id: ID!
        disign: String!
        subtotal: Float!
        horas_estimadas: Float!
        id_prestador: ID!
        id_servico: Float!
        preco_hora: Float!
        estado: String!
        id_orcamento: Float!
        id_utilizador: String!
        urgente: Boolean!
        enabled: Boolean!
    }
    input userImputcreate{
        nome: String!
        numero: String!
        data_nascimento: String!
        email: String!
        telefone: String!
        pais: String!
        localidade: String!
        password: String!
        role: Role!
        enabled: Boolean!
        updated_et: String!
        created_at: String!
    }
    input userImputupdate{
        id: ID!
        nome: String!
        numero: String!
        data_nascimento: String!
        email: String!
        telefone: String!
        pais: String!
        localidade: String!
        password: String!
        role: Role!
        enabled: Boolean!
    }
    input providerImputcreate{
        nif: Int!
        profissao: String!
        minimoDesconto: Float!
        taxaUrgencia: Float!
        percentagemDesconto: Float!
        estado: Boolean!
        enabled: Boolean!
        created_at: String!
        updated_at: String!
    }
    input providerImputupdate{
        id: ID!
        nif: Int!
        profissao: String!
        minimoDesconto: Float!
        taxaUrgencia: Float!
        percentagemDesconto: Float!
        estado: Boolean!
        enabled: Boolean!
    }
    input categoryImputcreate{
        designacao: String!
        icone: String!
        created_at: String!
        updated_at: String!
    }
    input categoryImputupdate{
        id: ID!
        designacao: String!
        icone: String!
    }
    input companyImputcreate{
        designacao: String!
        descricao: String!
        nif: Int!
        icone: String!
        id_utilizador: ID!
        localizacao: String!
        enabled: Boolean!
        updated_et: String!
        created_at: String!
    }
    input companyImputupdate{
        id: ID!
        designacao: String!
        descricao: String!
        nif: Int!
        icone: String!
        localizacao: String!
        enabled: Boolean!
    }
    input budgetImputcreate{
        total: String!
        id_utilizadores: ID!
        enabled: Boolean!
        created_at: String!
        updated_at: String!
    }
    input budgetImputupdate{
        id: ID!
        total: String!
        id_utilizadores: ID!
        enabled: Boolean!
    }
    input proposalImputcreate{
        id_prestacao_servico: ID!
        preco_hora: String!
        horas_estimadas: String!
        owner: String!
        estado: String!
        enabled: Boolean!
        created_at: String!
        updated_at: String!
        id_prestador: ID!
    }
    input proposalImputupdate{
        id: ID!
        id_prestacao_servico: ID!
        preco_hora: String!
        horas_estimadas: String!
        owner: String
        estado: String!
        enabled: Boolean!
    }
    type Query {
        getAllUsers: [User]
        getUserById(id: ID!): User
        getAllServices: [Service]
        getServiceById(id: ID!): Service
        getAllProviders: [Provaider]
        getProviderById(id: ID!): Provaider
        getAllCategories: [Category]
        getCategoryById(id: ID!): Category
        getAllCompanies: [Company]
        getCompanyById(id: ID!): Company
        getAllBudgets: [Budget]
        getBudgetById(id: ID!): Budget
        getAllProposals: [Proposal]
        getProposalById(id: ID!): Proposal
        getAllServiceProv: [ServiceProv]
        getServiceProvById(id: ID!): ServiceProv
    }
    type Mutation {
        createUser(user: userImputcreate!): User
        updateUser(user: userImputupdate!): User
        deleteUser(id: ID!): User
        createService(
            nome: String!
            descricao: String!
            categoria: String!
            enabled: Boolean!
        ): Service
        updateService(
            id: ID!
            nome: String!
            descricao: String!
            categoria: String!
            enabled: Boolean!
        ): Service
        deleteService(id: ID!): Service
        createServiceProv(serviceProv: serviceprovImputcreate!): ServiceProv
        updateServiceProv(serviceProv: serviceprovImputupdate!): ServiceProv
        deleteServiceProv(id: ID!): ServiceProv
        createProvider(provider: providerImputcreate!): Provaider
        updateProvider(provider: providerImputupdate!): Provaider
        deleteProvider(id: ID!): Provaider
        createCategory(category: categoryImputcreate!): Category
        updateCategory(category: categoryImputupdate!): Category
        deleteCategory(id: ID!): Category
        createCompany(company: companyImputcreate!): Company
        updateCompany(company: companyImputupdate!): Company
        deleteCompany(id: ID!): Company
        createBudget(budget: budgetImputcreate!): Budget
        updateBudget(budget: budgetImputupdate!): Budget
        deleteBudget(id: ID!): Budget
        createProposal(proposal: proposalImputcreate!): Proposal
        updateProposal(proposal: proposalImputupdate!): Proposal
        deleteProposal(id: ID!): Proposal
    }
`