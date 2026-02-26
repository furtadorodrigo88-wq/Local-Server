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


export function adicionarServico(servico: ServicoType): ResponceType {
    if (!servico.nome || servico.precoHora >= 0) {
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



export default adicionarServico