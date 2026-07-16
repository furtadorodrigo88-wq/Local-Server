import type { PedidoServico, PrestadorType } from "../utils/types.js";
export declare function criarPrestadorDeServico(novoPrestador: PrestadorType): {
    status: boolean;
    message: string;
    data: null;
};
export declare function SelecionarPrestador(prestador: PrestadorType): {
    status: boolean;
    nomeServico: any;
    data: string;
};
export declare function ApagarPrestador(nome: string): true | undefined;
export declare function SelecionarServicos(nome: string): boolean;
export declare function ProcessarPedido(pedido: PedidoServico, precoHora: number): number;
export declare function CalcularOrcamento(pedido: PedidoServico): number;
//# sourceMappingURL=orcamento.d.ts.map