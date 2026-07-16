import type { ServicoType, ResponseType, ServicoDBType } from "../utils/types.js";
import db from "../lib/db.js";



let servicotest: ServicoType = {
    nome:                   "gfg",
    precoHora:              0,
    categoria:              "defgdfg",
    minimoDescontos:        0,
    percentagemDesconto:    0,
}

export let catalogoServicos: ServicoType[] = []

export function AdicionarServico(servico: ServicoType): ResponseType | string {

    if(!servico.nome){
        return "Erro: insira um nome";
    };

    if(servico.precoHora < 0){
        return "Erro: Preco por Hora inválido";
    };

    for(let i = 0; i < catalogoServicos.length; i++){
        if(catalogoServicos[i]?.nome === servico.nome){
            return "Serviço já existente";
        }
    }

    catalogoServicos.push(servico);

    return(
        {
        status:             true,
        nomeServico:        servico.nome,
        data:               servico
    }   
    )
}

export function ListarServico(): ServicoType[]{
    //TODO: implementar fetch servicos
    return catalogoServicos;
}

export function ApagarServico(nome: string): boolean{
    // TODO: implementar delete de servicos

    const catalogoTemp: ServicoType[] = [];

        for(let i = 0; i < catalogoServicos.length; i++){
            if(catalogoServicos[i]?.nome && catalogoServicos[i]?.nome !== nome){
                catalogoTemp.push(catalogoServicos[i]!)
        }
}
    catalogoServicos = catalogoTemp;
    return true;
}

export function obterServico(nome: string): ServicoType | null {
        for(let i = 0; i < catalogoServicos.length; i++){
            if(catalogoServicos[i]?.nome && catalogoServicos[i]?.nome === nome){
                return catalogoServicos[i]!;
            }
        }
        return null;
}


const agora = new Date().toISOString().slice(0, 19).replace('T', ' '); 

export async function addServicoDB(newservice: ServicoDBType) {
    try {
            const query = `INSERT INTO table_servicos VALUES (?, ?, ?, ?, ?, ?, ?) `;
            const values = [
                null, 
                newservice.nome, 
                newservice.descricao, 
                newservice.categoria, 
                newservice.enabled, 
                new Date(), 
                new Date()];

                const rows = await db.execute(query, values);
                return rows;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export async function getServiceById(id:string) {
    try{
        const query = `SELECT * FROM table_servicos WHERE id = ?`;

        const value = [id];

        const rows = await db.execute(query, value);

        return Array.isArray(rows) && rows.length > 0 ? rows[0]: null;
    } catch (err) {
        console.log(err);
        return null;
    }
    
}
export async function getAllServices() {
    try {
        const query = `SELECT * FROM table_servicos`;

        const rows = await db.execute(query);

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : [];

    }catch(err) {
        console.log(err);
        return null;
    }
    
}

// updated de dados
export async function updateService(id: string, updatedService: ServicoDBType) {
    try {
        const query = `UPDATE table_servicos
                        SET
                        nome=?,
                        descricao=?,
                        categoria=?,
                        enabled=?,
                        updated_at=?
                        WHERE 
                        id=?`

        const values = [
            updatedService.nome,
            updatedService.descricao,
            updatedService.categoria,
            updatedService.enabled,
            new Date(),
            id];

        const rows = await db.execute(query, values);
        return rows;
    }catch (err) {
        console.log(err);
        return null;
    }
}



export async function deleteService(id: string) {
    try {
        const query = `DELETE FROM table_servicos WHERE id= ?`

        const value = [id]

        const rows: any = await db.execute(query, value)

        return rows[0]?.affectedRows === 0 ? null : rows; 
    }catch (error) {
         console.log(error)
        return null
    }
       
}

