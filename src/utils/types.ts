
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
    id: number;
    nome: string;
    numero: string;
    data_nascimento: string;
    email: string;
    telefone: string;
    pais: string;
    localidade: string;
    password: string;
    enabled: boolean;
}


export interface Servicetype {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean,
    updated_et: string,
    created_at: string
}
