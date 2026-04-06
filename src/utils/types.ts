
export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface ResponseType {
    status: boolean,
    message: string,
    data: ServicoType | null,
}

export interface ServicoType {
    nome: string,
    precoHora: number
    categoria: string
    minimoDescontado: number
    percentagemDesconto?: number
}

export interface PrestadorType {
    nome: string
    precoHora: number
    proficao: string
    minimoDesconto: number
    porcentagemDesconto: number
    taxaUregencia: number
}

//reformulaçao de type

export interface UserType {
    id: string
    nome: string
    numero: string
    data_nascimento: string
    email: string
    telefone: string
    pais: string
    localidade: string
    password: string
    enabled: boolean
    updated_et: string
    created_at: string
}


export interface Servicetype {
    id: string
    nome: string
    descricao: string
    categoria: string
    enabled: boolean
    updated_et: string
    created_at: string
}

export interface ProvaiderType {
    id: string
    nif: number
    profissao: string
    minimoDesconto: number
    taxaUrgencia: number
    percentagemDesconto: number
    estado: boolean
    enabled: boolean
    created_at: string
    updated_at: string
}

export interface BudgetType {
    id: string
    total: string
    id_utilizadores: string
    enabled: boolean
    created_at: string
    updated_at: string
}

export interface ServiceProvType {
    id: string
	disign: string
	subtotal: number
	horas_estimadas: number
	id_prestador: string
	id_servico: number
	preco_hora: number
	estado: string
	id_orcamento: number
	enabled: boolean
	created_at: string
	updated_at: string
}

export interface ProposalType {
    id: string
	id_prestacao_servico: string
	preco_hora: string
	horas_estimadas: string
	estado: string
	enabled: boolean
	created_at: string
	updated_at: string
	id_prestador: string
}
export enum Estado {
    PENDENTE = "pendente",
    ACEITE = "aceite",
    CANCELADO = "cancelado",
    COMPLETO = "completo",
    EM_PROGRESSO = "em progresso"
}