interface ResponceType {
    status: boolean,
    mensagem: string,
    data: ServicoType | null,
}
interface ServicoType {
    nome: string,
    precoHora: number,
    categoria: string,
    minimoDescontado: number,
    porcentagemDesconto: number
}

let catalogoServico: ServicoType[] = []

//adicionar um servico novo
export function adicionarServico(servico: ServicoType): ResponceType {
    if (!servico.nome || servico.precoHora <= 0) {
        return ({
            status: false,
            mensagem: "Erro: Nome obrigatorio e preço do serviço tem que ser maior q 0",
            data: null
        })
    }

    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === servico.nome) {
            return ({
                status: false,
                mensagem: "Erro: Serviço existente",
                data: null
        })
        }
    }

    catalogoServico.push(servico)
    return {
        status: true,
        mensagem: "serviço adicionado com susseço",
        data: servico
    }
}

//Listar todos os servicos

export function listarServicos(): ServicoType[] {
    //TUDO: implementar fetch de servidor

    return catalogoServico
}

//Apagar um servico

export function apagarservico(nome: string): boolean{
    //TUDO: implementar fetch de servidor

    const novoCatalogoTemp: ServicoType [] = []
    for(let i = 0; i < catalogoServico.length; i++){
        if (catalogoServico[i]?.nome !== nome){
            if (catalogoServico[i])novoCatalogoTemp.push(catalogoServico[i]!)
        }
    } // devolve um novo catalogo sem o servico apagado

    catalogoServico = novoCatalogoTemp
    return true
}