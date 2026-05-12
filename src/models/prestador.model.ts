import type { promises } from "node:dns";
import db from "../lib/db.js";
import type { ProvaiderType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";
import type { RowDataPacket } from "mysql2";



export const ProviderModel = {
    async create(newPrestador: ProvaiderType): Promise<ProvaiderType | null> {
        try {
            const query = "INSERT INTO tbl_prestadores (id, nif, profissao, minimo_desconto, taxa_urgencia, percentagem_desconto, estado, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            const value = [
                generateUUID(),
                newPrestador.nif,
                newPrestador.profissao,
                newPrestador.minimoDesconto,
                newPrestador.taxaUrgencia,
                newPrestador.percentagemDesconto,
                newPrestador.estado,
                newPrestador.enabled,
                new Date(),
                new Date()
            ]
            const [result] = await db.execute<ProvaiderType & RowDataPacket[]>(query, value);
            if (Array.isArray(result) && result.length === 0) return null
            return Array.isArray(result) ? result[0] as ProvaiderType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAll(): Promise<ProvaiderType[] | null> {
        try {
            const query = "SELECT * FROM tbl_prestadores"
            const rows = await db.execute<ProvaiderType[] & RowDataPacket[]>(query)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as ProvaiderType[] : []
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async get(id: string): Promise<ProvaiderType | null> {
        try {
            const query = `
            SELECT DISTINCT 
                p.*,
                u.id as owner
            FROM tbl_prestadores p
            INNER JOIN tbl_utilizadores u ON p.id_utilizador = u.id
            WHERE p.id = ?
            `
            const value = [id]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as ProvaiderType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update(id: string, newProvider: ProvaiderType): Promise<ProvaiderType | null> {
        try {
            const query = "UPDATE tbl_prestadores SET nif=?, profissao=?, minimo_desconto=?, taxa_urgencia=?, percentagem_desconto=?, estado=?, enabled=?, updated_at=? WHERE id=?"
            const value = [
                newProvider.nif,
                newProvider.profissao,
                newProvider.minimoDesconto,
                newProvider.taxaUrgencia,
                newProvider.percentagemDesconto,
                newProvider.estado,
                newProvider.enabled,
                new Date(),
                id
            ]
            const [result] = await db.execute<ProvaiderType & RowDataPacket[]>(query, value);
            if (Array.isArray(result) && result.length === 0) return null
            return Array.isArray(result) ? result[0] as ProvaiderType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async delete(id: string): Promise<ProvaiderType | null> {
        try {
            const query = "DELETE FROM tbl_prestadores WHERE id=?"
            const value = [id]
            const [rows] = await db.execute<ProvaiderType & RowDataPacket[]>(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as ProvaiderType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getPrecoHora(id: string): Promise<ProvaiderType | null> {
        try {
            const query = `SELECT
                                p.percentagem_desconto,
                                p.taxa_Urgencia,
                                pr.preco_hora
                            FROM tbl_prestadores p
                            INNER JOIN tbl_proposta pr ON p.id = pr.id_prestador
                            WHERE p.id_utilizador = ?`
            const value = [id]
            const [rows] = await db.execute<ProvaiderType[] & RowDataPacket[]>(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as ProvaiderType : null
        } catch (err) {
            console.log(err)
            return null
        }
    }
}