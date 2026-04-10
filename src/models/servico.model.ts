import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { Servicetype } from "../utils/types.js";


export const ServiceModel = {
    async create(newService: Servicetype): Promise<Servicetype | null> {
        try {
            const query = "INSERT INTO tbl_servicos (id, nome, descricao, categoria, enabled, created_at, updated_at) VALUE (?,?,?,?,?,?,?)"
            const value = [
                null,
                newService.nome,
                newService.descricao,
                newService.categoria,
                newService.enabled,
                new Date(),
                new Date()
            ]
            const [newservice] = await db.execute<Servicetype[] & RowDataPacket[]>(query, value)

            return newservice[0] as Servicetype
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAll(): Promise<Servicetype[] | null> {
        try {
            const query = "SELECT * FROM tbl_servicos"
            const [rows] = await db.execute<Servicetype[] & RowDataPacket[]>(query)
            return Array.isArray(rows) && rows.length > 0 ? rows as Servicetype[] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async get(id: string): Promise<Servicetype | null> {
        try {
            const query = "SELECT * FROM tbl_servicos WHERE tbl_servicos.id = ?"
            const value = [id]
            const [rows] = await db.execute<Servicetype[] & RowDataPacket[]>(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as Servicetype : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update (id: string, newService: Servicetype): Promise<Servicetype | null> {
        try {
        const query = "UPDATE tbl_servicos SET nome=?, descricao=?, categoria=?, enabled=?, updated_at=? WHERE id=?"
        const value = [
        newService.nome,
        newService.descricao,
        newService.categoria,
        newService.enabled,
        new Date(),
        id
    ]
        const [updatedUser] = await db.execute<Servicetype[] & RowDataPacket[]>(query, value)
    return updatedUser[0] as Servicetype
    } catch (err) {
        console.log(err)
        return null
    }
    },
    async delete (id: string): Promise<Servicetype | null> {
        try {
        const query = "DELETE FROM tbl_servicos WHERE id=?"
        const value = [id]
        const [rows] = await db.execute<Servicetype[] & RowDataPacket[]>(query, value)
        return rows[0] as Servicetype
    } catch (err) {
        console.log(err)
        return null
    }
    
    }
}
