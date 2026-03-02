export class Prestador {
    nome: string
    precoHora: number
    proficao: string
    minimoDesconto: number
    porcentagemDesconto: number
    taxaUregencia: number

    constructor (nomeDoPrestador: string, precoHoraDoPrestador: number, proficaoDoPrestador: string, minimoDescontoDoPrestador: number, porcentagemDescontoDoPrestador: number, taxaUregenciaDoPrestador: number){
        this.nome = nomeDoPrestador
        this.precoHora = precoHoraDoPrestador
        this.proficao = proficaoDoPrestador
        this.minimoDesconto = minimoDescontoDoPrestador
        this.porcentagemDesconto = precoHoraDoPrestador
        this.taxaUregencia = taxaUregenciaDoPrestador
    }
    alterarPrecoHora(novoPrecoHora: number) {
        this.precoHora = novoPrecoHora
    }
    alterarNome(novoNome: string) {
        this.nome = novoNome
    }

}

const prestador1 = new Prestador ("Wilson",1000,"Desenvolvedor de software",1000000,0.1,0.3)
