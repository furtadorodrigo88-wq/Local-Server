import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { serviceProvDetailsType, ServiceProvType } from "../utils/types.js";


export const serviceProvModel = {
    async create(newSP: ServiceProvType): Promise<ServiceProvType | null> {
        try {
            const query = "INSERT INTO tbl_prestacao_servicos (id, disign, subtotal, horas_estimadas, id_prestador, id_servico, preco_hora, estado, id_orcamento, id_utilizador, urgente, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            const value = [
                null,
                newSP.disign,
                newSP.subtotal,
                newSP.horas_estimadas,
                newSP.id_prestador,
                newSP.id_servico,
                newSP.preco_hora,
                newSP.estado,
                newSP.id_orcamento,
                newSP.id_utilizador,
                newSP.urgente,
                newSP.enabled,
                new Date (),
                new Date ()
            ]
            const [result] = await db.execute<ServiceProvType[] & RowDataPacket[]>(query, value);
            if (Array.isArray(result) && result.length === 0) return null
            return Array.isArray(result) ? result[0] as ServiceProvType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAll(): Promise<ServiceProvType[] | null> {
        try {
            const query = "SELECT * FROM tbl_prestacao_servicos"
            const [rows] = await db.execute<ServiceProvType[] & RowDataPacket[]>(query)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as ServiceProvType[] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async get(id: string): Promise<ServiceProvType | null> {
        try {
            const query = `
            SELECT DISTINCT 
                ps.*,
                u.id as owner
            FROM tbl_prestacao_servicos ps
            INNER JOIN tbl_prestadores pr ON ps.id_prestador = pr.id
            INNER JOIN tbl_utilizadores u ON pr.id_utilizador = u.id
            WHERE ps.id = ?
            `
            const value = [id]
            const [rows] = await db.execute<ServiceProvType[] & RowDataPacket[]>(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as ServiceProvType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update (id: string, newSP: ServiceProvType): Promise<ServiceProvType | null> {
        try {
            const query = "UPDATE tbl_prestacao_servicos SET disign=?, subtotal=?, horas_estimadas=?, id_prestador=?, id_servico=?, preco_hora=?, estado=?, id_orcamento=?, id_utilizador=?, urgente=?, enabled=?, updated_at=?  WHERE id=?"
            const value = [
                newSP.disign,
                newSP.subtotal,
                newSP.horas_estimadas,
                newSP.id_prestador,
                newSP.id_servico,
                newSP.preco_hora,
                newSP.estado,
                newSP.id_orcamento,
                newSP.id_utilizador,
                newSP.urgente,
                newSP.enabled,
                new Date (),
                id
            ]
            const [result] = await db.execute<ServiceProvType[] & RowDataPacket[]>(query, value);
            if (Array.isArray(result) && result.length === 0) return null
            return Array.isArray(result) ? result[0] as ServiceProvType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async delete (id: string): Promise<ServiceProvType | null> {
        try {
        const query = "DELETE FROM tbl_prestacao_servicos WHERE id=?"
        const value = [id]
        const [rows] = await db.execute<ServiceProvType[] & RowDataPacket[]>(query, value)
        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows[0] as ServiceProvType : null
    } catch (err) {
        console.log(err)
        return null
    }
    },
    async getByOrcamento(idOrcamento: string): Promise<ServiceProvType | null> {
        try {
            const query = "SELECT * FROM tbl_prestacao_servicos WHERE tbl_prestacao_servicos.id_orcamento = ?"
            const value = [idOrcamento]
            const [rows] = await db.execute<ServiceProvType[] & RowDataPacket[]>(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as ServiceProvType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAllserviceProvDetails(limit: number, offset: number) {
        try {
            const query = `
            SELECT 
                ps.id as id_prestacao_servico,
                ps.designaçao as descricao,
                u.nome as nome_utilizador.
                u.email as email_utilizador,
                s.nome as nome_servico,
                ps.created_at as data_pedido,
                ps.urgencia
            FROM tbl_prestacao_servicos ps
            INNER JOIN tbl_utilizadores u ON ps.id_utilizador = u.id
            INNER JOIN tbl_servico s ON ps.id_servico = s.id
            ORDER BY ps.created_at DESC
            LIMIT ? OFFSET ?
            `
            const values = [limit.toString(), offset.toString()]
            const [ rows ] = await db.execute<(serviceProvDetailsType[] & RowDataPacket[])>(query, values)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as serviceProvDetailsType[] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAllServiceProvByCategoria (id_categoria: string, limit: number, offset: number) {
        try {
            const query = `
            SELECT 
                ps.id as id_prestacao_servico,
                ps.designaçao as descricao,
                u.nome as nome_utilizador.
                u.email as email_utilizador,
                s.nome as nome_servico,
                ps.created_at as data_pedido,
                ps.urgencia
                c.designacao as categoria
                c.id as id_categoria
                c.icone as icone_categoria
            FROM tbl_prestacao_servicos ps
            INNER JOIN tbl_utilizadores u ON ps.id_utilizador = u.id
            INNER JOIN tbl_servico s ON ps.id_servico = s.id
            INNER JOIN tbl_categoria c ON s.id_categoria = c.id AND c.id = ?
            ORDER BY ps.created_at DESC
            LIMIT ? OFFSET ?
            `
            const values = [id_categoria, limit.toString(), offset.toString()]
            const [ rows ] = await db.execute<(serviceProvDetailsType[] & RowDataPacket[])>(query, values)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as serviceProvDetailsType[] : null
        } catch (err) {
            console.log(err)
            return null
        }
    }
}