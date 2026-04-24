export enum Role{
    CLIENTE = "cliente",
    PRESTADOR = "prestador",
    ADMIN = "administrador",
    EMPRESA = "empresa"
}

export enum Estadoproposta {
    PENDENTE = "pendente",
    ACEITE = "aceite",
    CANCELADO = "cancelado"
}

export enum EstadoPrestacao {
    PENDENTE = "pendente",
    EM_PROGRESSO = "em progresso",
    FINALIZADO = "finalizado",
    CANCELADO = "cancelado"
}
export enum TipoPrestador {
    PARTICULAR = "particular",
    EMPRESA = "empresa"
}



export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
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
    role: string
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
	id_servico: string
	preco_hora: number
	estado: string
	id_orcamento: string
    id_utilizador: string
    urgente: boolean
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
    owner: string
	enabled: boolean
	created_at: string
	updated_at: string
	id_prestador: string
}


export interface ResponseType <T> {
    status: "success" | "error",
    message: string,
    data: T | null,
}

export interface serviceProvDetailsType {
    id: string
    nome_utilizador: string
    email_utilizador: string
    nome_servico:string
    descricao: string
    data_pedido: string
    urgente: boolean
}

export interface AcceptProposalType {
    id: string;
    id_orcamento: string;
    id_prestacao_servico: string;
    estado: string;
}

export interface ServiceDetaltype {
    id: string
    nome: string
    descricao: string
    designacao_categoria: string
    icone_categoria: string
    id_empresa: string
    designacao_empresa: string
    icone_empresa: string
    enabled: boolean
}

export interface CategoryType {
    id: string
    designacao: string
    icone: string
    created_at: string
    updated_at: string
}

export interface CompanyType {
    id: string
    designacao: string
    descricao: string
    nif: number
    icone: string
    id_utilizador: string
    localizacao: string
    enabled: boolean
    updated_et: string
    created_at: string
}
