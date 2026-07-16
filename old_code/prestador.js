class Prestador {
    nome;
    precoHora;
    profissao;
    minimoParaDesconto;
    percentagemDesconto;
    taxaUrgencia;
    constructor(nomeDoPrestador, precoHoraDoPrestador, profissaoDoPrestador, minimoParaDescontoDoPrestador, percentagemDescontoDoPrestador, taxaUrgenciaDoPrestador) {
        this.nome = nomeDoPrestador;
        this.precoHora = precoHoraDoPrestador;
        this.profissao = profissaoDoPrestador;
        this.minimoParaDesconto = minimoParaDescontoDoPrestador;
        this.percentagemDesconto = percentagemDescontoDoPrestador;
        this.taxaUrgencia = taxaUrgenciaDoPrestador;
    }
    alterarPrecoHora(novoPrecoHora) {
        this.precoHora = novoPrecoHora;
    }
    alterarNome(novoNome) {
        this.nome = novoNome;
    }
}
const prestador1 = new Prestador("Kristian", 100, "Desenvolvidor de software", 1000, 0.1, 0.3);
export {};
//# sourceMappingURL=prestador.js.map