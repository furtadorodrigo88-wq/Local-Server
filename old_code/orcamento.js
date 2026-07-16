import { catalogoServicos } from "./servico.js";
const pedido = {
    cliente: "string",
    descricao: "servi",
    horasEstimadas: 24,
    urgente: true
};
const precoHora = 10;
const servicoSelecionados = [];
/*
#################################################
#################################################
#################################################
#################################################
#################################################
*/
const prestadoresDeServicos = [];
const prestadorSelecionado = [];
export function criarPrestadorDeServico(novoPrestador) {
    // verificar se o prestador ja esta no array{
    for (let i = 0; i < prestadoresDeServicos.length; i++) {
        if (prestadoresDeServicos[i]?.nome === novoPrestador.nome) {
            return {
                status: false,
                message: "ja existe um prestador de servico com esse nome",
                data: null
            };
        }
    }
    // se o prestador nao existir, adicionamos o novo prestador
    prestadoresDeServicos.push(novoPrestador);
    return {
        status: true,
        message: "adicionado",
        data: null
    };
}
export function SelecionarPrestador(prestador) {
    for (let i = 0; i < prestadoresDeServicos.length; i++) {
        if (prestadoresDeServicos[i]?.nome === prestador.nome) {
            return {
                status: false,
                nomeServico: prestador.profissao,
                data: "Prestador não existe"
            };
        }
    }
    ;
    for (let i = 0; i < prestadorSelecionado.length; i++) {
        if (prestadorSelecionado[i]?.nome === prestador.nome) {
            return ({
                status: false,
                nomeServico: prestador.profissao,
                data: "Prestador já foi selecionado"
            });
        }
    }
    ;
    prestadorSelecionado.push(prestador);
    return ({
        status: true,
        nomeServico: prestador.nome,
        data: "Prestador selecionado"
    });
}
export function ApagarPrestador(nome) {
    for (let i = 0; i < prestadoresDeServicos.length; i++) {
        if (prestadoresDeServicos[i]?.nome && prestadoresDeServicos[i]?.nome === nome) {
            prestadoresDeServicos.splice(i, 1);
            return true;
        }
    }
}
export function SelecionarServicos(nome) {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome && catalogoServicos[i]?.nome === nome) {
            servicoSelecionados.push(catalogoServicos[i]);
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
export function ProcessarPedido(pedido, precoHora) {
    let urgencia = 0.3 * precoHora;
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
let taxaDeUrgencia = 0.3;
let minimoDescontos = 150;
let desconto = 0.15;
export function CalcularOrcamento(pedido) {
    let totalBruto = 0;
    let totalFinal = 0;
    servicoSelecionados.map((servico) => {
        let totalDoServico = servico.precoHora * pedido.horasEstimadas;
        totalBruto += totalDoServico;
    });
    totalFinal += totalBruto;
    if (pedido.urgente) {
        totalFinal += (totalBruto * taxaDeUrgencia);
    }
    if (totalBruto >= minimoDescontos) {
        totalFinal -= (totalBruto * desconto);
    }
    return totalFinal;
}
//# sourceMappingURL=orcamento.js.map