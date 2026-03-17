import { type ResponseType, type Servicetype, type ServicoType } from "./utils/types.js"
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
//====================================refurmulaçao de funçao========================================================

// pegar dados de servicos
export async function getService() {
    try {
        const query = "SELECT * FROM tbl_servicos"
        const rows  = await db.execute(query)
        return Array.isArray(rows)   && rows.length >0 ? rows [0] : []
    } catch  (err) {
    console.log(err)
    return null
    }
};


//pegar dados de servico atravez de id
export async function getServiceById (id: string) {
    try {
        const query = "SELECT * FROM tbl_servicos WHERE tbl_servicos.id = ?"
        const value = [id]
        const [ rows ] = await db.execute(query,value)
        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows [0] : null
    } catch  (err) {
    console.log(err)
    return null
    }
}


//colocar um novo servico
export async function insertService ( service: Servicetype) {
    try{
        const query = "INSERT INTO tbl_servicos VALUE(?,?,?,?,?,?,?)"
        const value = [
        null,
        service.nome,
        service.descricao,
        service.categoria,
        service.enabled,
        new Date(),
        new Date()
    ]
    const newservice = await db.execute(query,value)

    return newservice 
}catch  (err) {
    console.log(err)
    return null
}
}


//atualizar servico pelo id
export async function updateService (id: string, service: Servicetype) {
    try {
        const query = "UPDATE tbl_servicos SET nome=?, descricao=?, categoria=?, enabled=?, updated_at=? WHERE id=?"
        const value = [
        service.nome,
        service.descricao,
        service.categoria,
        service.enabled,
        new Date(),
        id
    ]
        const updatedUser = await db.execute(query, value)
    return updatedUser
    } catch (err) {
        console.log(err)
        return null
    }
    
}


// delete servico pelo id
export async function DeleteService (id: string) {
    try {
        const query = "DELETE FROM tbl_servicos WHERE id=?"
        const value = [id]
        const rows = await db.execute(query, value)
        return rows
    } catch (err) {
        console.log(err)
    }
    
}