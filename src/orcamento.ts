
interface PedidoServico {
    cliente: string,
    discricao: string,
    horasEstimadas: number,
    uregente: boolean
};




function processarPedido (pedido: PedidoServico, precoHora: number) {
    let total = pedido.horasEstimadas * precoHora
    pedido.uregente? total = total + total * 0.3 : total
    return total
}


export default processarPedido