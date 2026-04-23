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
        createUser(
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
        ): User
        updateUser(
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
        ): User
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
        createServiceProv(
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
            created_at: String!
            updated_at: String!
        ): ServiceProv
        updateServiceProv(
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
        ): ServiceProv
        deleteServiceProv(id: ID!): ServiceProv
        createProvider(
            nif: Int!
            profissao: String!
            minimoDesconto: Float!
            taxaUrgencia: Float!
            percentagemDesconto: Float!
            estado: Boolean!
            enabled: Boolean!
            created_at: String!
            updated_at: String!
        ): Provaider
        updateProvider(
            id: ID!
            nif: Int!
            profissao: String!
            minimoDesconto: Float!
            taxaUrgencia: Float!
            percentagemDesconto: Float!
            estado: Boolean!
            enabled: Boolean!
        ): Provaider
        deleteProvider(id: ID!): Provaider
        createCategory(
            designacao: String!
            icone: String!
            created_at: String!
            updated_at: String!
        ): Category
        updateCategory(
            id: ID!
            designacao: String!
            icone: String!
        ): Category
        deleteCategory(id: ID!): Category
        createCompany(
            designacao: String!
            descricao: String!
            nif: Int!
            icone: String!
            id_utilizador: ID!
            localizacao: String!
            enabled: Boolean!
            updated_et: String!
            created_at: String!
        ): Company
        updateCompany(
            id: ID!
            designacao: String!
            descricao: String!
            nif: Int!
            icone: String!
            localizacao: String!
            enabled: Boolean!
        ): Company
        deleteCompany(id: ID!): Company
        createBudget(
            total: String!
            id_utilizadores: ID!
            enabled: Boolean!
            created_at: String!
            updated_at: String!
        ): Budget
        updateBudget(
            id: ID!
            total: String!
            id_utilizadores: ID!
            enabled: Boolean!
        ): Budget
        deleteBudget(id: ID!): Budget
        createProposal(
            id_prestacao_servico: ID!
            preco_hora: String!
            horas_estimadas: String!
            owner: String!
            estado: String!
            enabled: Boolean!
            created_at: String!
            updated_at: String!
            id_prestador: ID!
        ): Proposal
        updateProposal(
            id: ID!
            id_prestacao_servico: ID!
            preco_hora: String!
            horas_estimadas: String!
            owner: String
            estado: String!
            enabled: Boolean!
        ): Proposal
        deleteProposal(id: ID!): Proposal
    }
`