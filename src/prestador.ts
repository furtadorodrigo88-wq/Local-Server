import db from "./lib/db.js"
import type { PrestadorType } from "./utils/types.js"

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



// pegar dados de prestador
export async function getprovider() {
    const [ rows ] = await db.execute("SELECT * FROM tbl_prestadores")
    return rows
};


//pegar dados de prestador atravez de id
export async function getproviderById (id: string) {
    const [ rows ] = await db.execute("SELECT * FROM tbl_prestadores WHERE tbl_prestadores.id = ?", [id])
    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows [0] : null
}

//colocar um novo utilizador
export async function createProvider(p: PrestadorType) {
    const query = "INSERT INTO tbl_prestadores (nome, precoHora, proficao, minimoDesconto, porcentagemDesconto, taxaUregencia) VALUES (?, ?, ?, ?, ?, ?)"
    const value =[
        p.nome, 
        p.precoHora, 
        p.proficao, 
        p.minimoDesconto, 
        p.porcentagemDesconto, 
        p.taxaUregencia]
    const [ result ] = await db.execute(query,value);
    return result;
}

//nota: corigir o type do prestador