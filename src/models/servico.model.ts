import db from "../lib/db.js";
import type { Servicetype } from "../utils/types.js";


export const ServiceModel = {
    async create(newService: Servicetype) {
        try {
            const query = "INSERT INTO tbl_servicos VALUE(?,?,?,?,?,?,?)"
            const value = [
                null,
                newService.nome,
                newService.descricao,
                newService.categoria,
                newService.enabled,
                new Date(),
                new Date()
            ]
            const newservice = await db.execute(query, value)

            return newservice
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAll() {
        try {
            const query = "SELECT * FROM tbl_servicos"
            const rows = await db.execute(query)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async get(id: string) {
        try {
            const query = "SELECT * FROM tbl_servicos WHERE tbl_servicos.id = ?"
            const value = [id]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update (id: string, newService: Servicetype) {
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
        const updatedUser = await db.execute(query, value)
    return updatedUser
    } catch (err) {
        console.log(err)
        return null
    }
    },
    async delete (id: string) {
        try {
        const query = "DELETE FROM tbl_servicos WHERE id=?"
        const value = [id]
        const rows = await db.execute(query, value)
        return rows
    } catch (err) {
        console.log(err)
    }
    
    }
}
