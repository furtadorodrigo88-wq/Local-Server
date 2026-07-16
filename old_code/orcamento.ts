import { catalogoServicos } from "./servico.js"
import type { PedidoServico, ServicoType, PrestadorType,  } from "../utils/types.js";


const pedido: PedidoServico = 
    {
    cliente:                "string",
    descricao:              "servi",
    horasEstimadas:         24,
    urgente:                true
    }

const precoHora: number = 10;

const servicoSelecionados: ServicoType[] = [];

/*
#################################################
#################################################
#################################################
#################################################
#################################################
*/
const prestadoresDeServicos: PrestadorType[] = [];
const prestadorSelecionado: PrestadorType[] = [];

export function criarPrestadorDeServico(novoPrestador: PrestadorType) {
    // verificar se o prestador ja esta no array{
        for(let i = 0; i < prestadoresDeServicos.length; i++){
            if(prestadoresDeServicos[i]?.nome === novoPrestador.nome){

            return {
                status: false,
                message: "ja existe um prestador de servico com esse nome",
                data: null
            }
        }
    }

    // se o prestador nao existir, adicionamos o novo prestador
    prestadoresDeServicos.push(novoPrestador)
    
    return {
            status: true,
            message: "adicionado",
            data: null
        }
}




export function SelecionarPrestador(prestador: PrestadorType){

        for(let i = 0; i < prestadoresDeServicos.length; i++){
            if(prestadoresDeServicos[i]?.nome === prestador.nome){
            return{
                    status:                 false,
                    nomeServico:            prestador.profissao,
                    data:                   "Prestador não existe"
                }
            }
        };

        for(let i = 0; i < prestadorSelecionado.length; i++){
            if(prestadorSelecionado[i]?.nome === prestador.nome){
            return(
            {
                    status:                 false,
                    nomeServico:            prestador.profissao,
                    data:                   "Prestador já foi selecionado"
            }
            )
        }
} ;
    
    prestadorSelecionado.push(prestador!)
    return(
            {
                status:                     true,
                nomeServico:                prestador.nome,
                data:                       "Prestador selecionado"
            }
    )

}



export function ApagarPrestador(nome: string){
        for (let i = 0; i < prestadoresDeServicos.length; i++){
            if (prestadoresDeServicos[i]?.nome && prestadoresDeServicos[i]?.nome === nome){
                prestadoresDeServicos!.splice(i, 1);
                return true;
            }
}
}



export function SelecionarServicos(nome: string){
        for (let i = 0; i < catalogoServicos.length; i++){
            if (catalogoServicos[i]?.nome && catalogoServicos[i]?.nome === nome){
                servicoSelecionados.push(catalogoServicos[i]!)
                return true;
            }
        }
        return false;
}





/*
#################################################
#################################################
#################################################
#################################################
#################################################
*/



export function ProcessarPedido(pedido: PedidoServico, precoHora: number): number{
    let urgencia =  0.3 * precoHora;
    let total = pedido.urgente === true ? (pedido.horasEstimadas *= precoHora) + urgencia : (pedido.horasEstimadas *= precoHora);
    return total;
}


/*
#################################################
#################################################
#################################################
#################################################
#################################################
*/


let taxaDeUrgencia: number =    0.3;
let minimoDescontos: number =   150;
let desconto: number =         0.15;


export function CalcularOrcamento(pedido: PedidoServico){
    let totalBruto: number = 0;
    let totalFinal: number = 0;

    servicoSelecionados.map((servico) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas;
        totalBruto += totalDoServico;
    })

    totalFinal += totalBruto;

    if (pedido.urgente){
        totalFinal += (totalBruto * taxaDeUrgencia);
    }

    if(totalBruto >= minimoDescontos){
        totalFinal -= (totalBruto * desconto)
    }

    return totalFinal;
}



