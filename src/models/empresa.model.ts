import type { RowDataPacket } from "mysql2";
import type { CompanyType } from "../utils/types.js";
import db from "../lib/db.js";



export const CompanyModel = {
    async create(newcompany: CompanyType): Promise<CompanyType | null> {
        try {
            const query = "INSERT INTO tbl_empresa (id, designacao, descricao, nif, icone, id_utilizador, localizacao, enabled, created_at, updated_at) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)"
            const value = [
                null,
                newcompany.designacao,
                newcompany.descricao,
                newcompany.nif,
                newcompany.icone,
                newcompany.id_utilizador,
                newcompany.localizacao,
                newcompany.enabled,
                new Date(),
                new Date()
            ]
            const [result] = await db.execute <CompanyType & RowDataPacket[]>(query, value);
            return result as CompanyType;
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAll(): Promise<CompanyType[] | null> {
        try {
            const query = "SELECT * FROM tbl_empresa"
            const rows = await db.execute<CompanyType[] & RowDataPacket[]>(query)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as CompanyType[] : []
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async get(id: string): Promise<CompanyType | null> {
        try {
            const query = `
            SELECT DISTINCT
                e.*,
                u.id as owner
            FROM tbl_empresa e
            INNER JOIN tbl_utilizadores u ON e.id_utilizador = u.id
            WHERE e.id = ?
            `
            const value = [id]
            const [rows] = await db.execute<CompanyType & RowDataPacket[]>(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as CompanyType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update(id: string, newcompany: CompanyType): Promise<CompanyType | null> {
        try {
            const query = "UPDATE tbl_empresa SET designacao=?, descricao=?, nif=?, icone=?, id_utilizador=?, localizacao=?, enabled=?, updated_at=? WHERE id=?"
            const value = [
                newcompany.designacao,
                newcompany.descricao,
                newcompany.nif,
                newcompany.icone,
                newcompany.id_utilizador,
                newcompany.localizacao,
                newcompany.enabled,
                new Date(),
                id
            ]
            const [result] = await db.execute<CompanyType & RowDataPacket[]>(query, value);
            return result as CompanyType;
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async delete(id: string): Promise<CompanyType | null> {
        try {
            const query = "DELETE FROM tbl_empresa WHERE id=?"
            const value = [id]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return (Array.isArray(rows) ? rows[0] : rows) as CompanyType
        } catch (err) {
            console.log(err)
            return null
        }
    }
}