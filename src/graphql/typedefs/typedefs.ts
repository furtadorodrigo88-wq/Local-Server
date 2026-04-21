import { gql } from "graphql-tag";


export const typeDefs = gql`
    enum Role {
        CLIENTE = "cliente",
        PRESTADOR = "prestador",
        ADMIN = "administrador",
        EMPRESA = "empresa"
    }
    enum EstadoPrestacao {
        PENDENTE = "pendente",
        EM_PROGRESSO = "em progresso",
        FINALIZADO = "finalizado",
        CANCELADO = "cancelado"
    }
    enum TipoPrestador {
        PARTICULAR = "particular",
        EMPRESA = "empresa"
    }
    enum EstadoProposta {
        PENDENTE = "pendente",
        ACEITE = "aceite",
        CANCELADO = "cancelado"
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
        id_prestacao_servico: ID!
        preco_hora: String!
        horas_estimadas: String!
        owner: User!
        estado: String!
        enabled: Boolean!
        created_at: String!
        updated_at: String!
        id_prestador: ID!
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
        id_utilizadores: ID!
        enabled: Boolean!
        created_at: String!
        updated_at: String!
    }
    type ServiceProv {
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
        id_utilizador: ID!
        localizacao: String!
        enabled: Boolean!
        updated_et: String!
        created_at: String!
    }
`