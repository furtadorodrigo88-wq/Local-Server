import db from "../lib/db.js";
import type { BudgetType, ServiceProvType } from "../utils/types.js";


export const budgetModel = {
    async create(newBudget: BudgetType) {
        try {
            const query = "INSERT INTO tbl_orcamento (id, total, id_utilizadores, enabled, created_at, updated_at) VALUES (?,?, ?, ?, ?, ?)"
            const value = [
                null,
                newBudget.total,
                newBudget.id_utilizadores,
                newBudget.enabled,
                new Date(),
                new Date()
            ]
            const [result] = await db.execute(query, value);
            return result;
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAll() {
        try {
            const query = "SELECT * FROM tbl_orcamento"
            const rows = await db.execute(query)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async get(id: string) {
        try {
            const query = "SELECT * FROM tbl_orcamento WHERE tbl_orcamento.id = ?"
            const value = [id]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update(id: string, newBudget: BudgetType) {
        try {
            const query = "UPDATE tbl_orcamento SET total=?, id_utilizadores=?, enabled=?, updated_at=? WHERE id=?"
            const value = [
                newBudget.total,
                newBudget.id_utilizadores,
                newBudget.enabled,
                new Date(),
                id
            ]
            const [result] = await db.execute(query, value);
            return result;
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async updateBudget(id: string, total: number) {
    try {
        const query = "UPDATE tbl_orcamento SET total=?, updated_at=? WHERE id=?"
        const value = [
            total,
            new Date(),
            id
        ]
        const rows: any = await db.execute(query, value);
        return rows[0].affectedRows === 0 ? null : rows[0];
    } catch (err) {
        console.log(err)
        return null
    }
},
    async delete(id: string) {
        try {
            const query = "DELETE FROM tbl_orcamento WHERE id=?"
            const value = [id]
            const rows = await db.execute(query, value)
            return rows
        } catch (err) {
            console.log(err)
        }
    }
}