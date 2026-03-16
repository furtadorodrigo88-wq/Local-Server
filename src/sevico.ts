import { type ResponseType, type ServicoType } from "./utils/types.js"
import db from "./lib/db.js"

export let catalogoServicos: ServicoType[] = []

// adicionar um serviço novo
export function adicionarServico(novoServico: ServicoType): ResponseType {
    if (!novoServico.nome || novoServico.precoHora <= 0) {
        return ({
            status: false,
            message: "Erro: Nome obrigatório e preço deve ser maior que zero.",
            data: null,
        });
    }

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === novoServico.nome) {
            return ({
                status: false,
                message: `Erro: O serviço '${novoServico.nome}' já existe.`,
                data: null,
            });
        }
    }

    catalogoServicos.push(novoServico);

    return ({
        status: true,
        message: "Sucesso: Serviço adicionado!",
        data: novoServico,
    });
}

// listar todos os serviços
export function listarServicos(): ServicoType[] {
    // TODO: implementar fetch de servicos

    return catalogoServicos
}

// apagar um servico 
export function apagarServico(nome: string): boolean {
    // TODO: implementar delete de servico

    const novoCatalogoTemp: ServicoType[] = []

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome !== undefined && catalogoServicos[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogoServicos[i]!)
        }
    } // devolve um novo catalogo sem o servico que foi apagado

    catalogoServicos = novoCatalogoTemp

    return true
}

// obter um servico pelo nome
export function obterServico(nome: string): ServicoType | null {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            return catalogoServicos[i]!
        }
    }
    return null
}


// pegar dados de servicos
export async function getService() {
    const [ rows ] = await db.execute("SELECT * FROM tbl_servicos")
    return rows
};


//pegar dados de servico atravez de id
export async function getServceById (id: number) {
    const [ rows ] = await db.execute("SELECT * FROM tbl_servicos WHERE tbl_servicos.id = ?", [id])
    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows [0] : null
}


//colocar um novo servico
export async function insertservce ( service: any ) {
    try{
    const user = await db.execute("INSERT INTO tbl_servicos VALUE(?,?,?,?,?,?,?)", [
        service.id,
        service.nome,
        service.descricao,
        service.categoria,
        service.enabled,
        new Date(),
        new Date()
    ])
    return user
}catch  (err) {
    console.log(err)
    return null
}
}


//atualizar servico pelo id
export async function updateServce (id: string, service: any) {
    try {
        const updatedUser = await db.execute("UPDATE tbl_servicos SET nome=?, descricao=?, categoria=?, enabled=?, updated_at=? WHERE id=?", [
        service.nome,
        service.descricao,
        service.categoria,
        service.enabled,
        new Date(),
        id
    ])
    return updatedUser
    } catch (err) {
        console.log(err)
        return null
    }
    
}