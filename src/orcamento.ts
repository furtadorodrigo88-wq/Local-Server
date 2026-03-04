
import { catalogoServicos } from "./sevico.js"
import { type PedidoServicoType, type PrestadorType, type ServicoType } from "./utils/types.js"

const taxaUrgencia: number = 0.3
const minimoParaDesconto: number = 100
const percentagemDesconto: number = 0.1

const servicosSelecionados: ServicoType[] = []
let prestadoresDeServico: PrestadorType[] = []
const prestadoresSelecionados: PrestadorType[] = []




// funcao para selecionar servicos e horasEstimadas
export function selecionarServicos(nome: string) {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            servicosSelecionados.push(catalogoServicos[i]!)
            return true
        }
    }
    return false
}

//funcao para selecionar prestador
export function selecionarPrestador(nome: string) {
    for (let i = 0; i < prestadoresDeServico.length; i++) {
        if (prestadoresDeServico[i]?.nome === nome) {
            prestadoresSelecionados.push(prestadoresDeServico[i]!)
            return true
        }
    }
    return {
        status: false,
        mensage: "Prestador add nao existente",
        data: null
    }
}


//funcao para criar prestador de servico
export function criarPrestadorDeServico(novoPrestador: PrestadorType) {
    prestadoresDeServico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === novoPrestador.nome) {
            // se o prestador ja existir, retorne uma mensagem de erro
            return {
                status: false,
                mensage: "Prestador de servico ja existente",
                data: null
            }
        }
    })
    // se o prestador nao existir add novo prestador
    prestadoresDeServico.push(novoPrestador)
    return {
        status: true,
        mensage: "Prestador add com sucesso",
        data: novoPrestador
    }
}

// funcao para editar prestador de servico
export function editarPrestadorServico(nomeDoPrestador: string, novosDadosDoPrestador: PrestadorType) {
    //emcontrar prestador de servico e editar na minha lista
    //ciclo que percore a lista e verificar o nome do prestador de servico
    prestadoresDeServico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === nomeDoPrestador) {
            prestadorExistente.nome = novosDadosDoPrestador.nome
            prestadorExistente.precoHora = novosDadosDoPrestador.precoHora
            prestadorExistente.proficao = novosDadosDoPrestador.proficao
            prestadorExistente.minimoDesconto = novosDadosDoPrestador.minimoDesconto
            prestadorExistente.porcentagemDesconto = novosDadosDoPrestador.porcentagemDesconto
            prestadorExistente.taxaUregencia = novosDadosDoPrestador.taxaUregencia

            return {
                status: true,
                mensage: "Prestador editado com sucesso",
                data: prestadorExistente
            }
        }
    })
    // se nao existir prestador com nome recebido, retorna mensage erro
    return{
        status: false,
        mensage: "Nenhum Prestador de servico com esse nome encontrado",
        data: null
    }

}

// listar todos os prestadores serviços
export function listarPrestadoresServicos(): PrestadorType[] {
    return prestadoresDeServico
}

// apagar um prestador de servico 
export function apagarPrestadorServico(nomeprestador: string) {
    if (nomeprestador === ""){
        return {
            status: false,
            mensage: "nome de prestador OBRIGATORIO",
            data: null
        }
    }
    const prestadoreExiste = prestadoresDeServico.some(
        (prestadorExistente: PrestadorType) => 
                prestadorExistente.nome === nomeprestador
    )

    if (!prestadoreExiste) {
        return{
            status: false,
            mensage: "Nao existe nenhum prestador de servico com nome",
            data: null
        }
    }
        
        prestadoresDeServico.filter(
            (prestadorExistente: PrestadorType) => {
                prestadorExistente.nome !== nomeprestador
            }
        )
        return {
            status: true,
            mensage: "Prestador de servico apagado com sucesso",
            data: prestadoresDeServico
        }
    } 


// obter um prestador servico pelo nome
export function obterPrestadorServico(nome: string): PrestadorType | null {
    for (let i = 0; i < prestadoresDeServico.length; i++) {
        if (prestadoresDeServico[i]?.nome === nome) {
            return prestadoresDeServico[i]!
        }
    }
    return null
}


// funcao para calcular o orcamento
export function calcularOrcamento(pedido: PedidoServicoType) {
    let totalBruto: number = 0
    let totalFinal: number = 0

    servicosSelecionados.map((servico: ServicoType) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalBruto = totalBruto + totalDoServico
    })

    totalFinal = totalBruto

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia)
    }

    if (totalBruto >= minimoParaDesconto) {
        totalFinal = totalFinal - (totalBruto * percentagemDesconto)
    }

    return totalFinal

    // () => {} --- arrow function
    // function () {} --- function normal

    /* 
    
    urgente: true
    taxaUrgencia: 0.3
    totalBruto: 100
    totalTaxa: 100 * 0.3 = 30
    totalFinal: 100 + 30 = 130

    totalBruto: 100
    totalbruto apos urgencia: 150
    minimo descnto: 100
    percentagem: 10%
    desconto sobre total final: 150 * 0.1 = 15
    desconto sobre total bruto: 100 * 0.1 = 10

    */
}
