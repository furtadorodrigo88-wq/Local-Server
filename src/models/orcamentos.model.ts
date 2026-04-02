import db from "../lib/db.js";
import type { BudgetType, Servicetype } from "../utils/types.js";


export const budgetModel = {
    async create(newBudget: BudgetType) {
        try {
            const query = "INSERT INTO tbl_orcamento (tatal, id_utilizadores, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            const value = [
                newBudget.tatal,
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
            const query = "UPDATE tbl_orcamento SET tatal=?, id_utilizadores=?, enabled=?, updated_at=? WHERE id=?"
            const value = [
                newBudget.tatal,
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
    async calculateBudget(id: string) {
        try {
            const query = "select ps.preco_hora, ps.horas_estimadas, p.taxa_Urgencia, p.percentagem_desconto from tbl_prestacao_servicos ps join tbl_prestadores p on ps.id_prestador where ps.id_orcamento = ?"
            const value = [id]
            const [service] = await db.execute(query, value) as [any[], any]
            if (!service) {
                return null
            }
            let total = 0
            service.forEach((serviceItem: any) => {
                total += serviceItem.preco_hora * serviceItem.horas_estimadas
                if (serviceItem.taxa_Urgencia) {
                    total += total * serviceItem.taxa_Urgencia
                }
                if (serviceItem.percentagem_desconto) {
                    total -= total * serviceItem.percentagem_desconto
                }
                return total
            })
            const querynew = "UPDATE tbl_orcamento SET tatal=?, updated_at=? WHERE id=?"
            const valuenew = [
                total, 
                new Date(), 
                id
            ]
            const updateBudget = await db.execute(querynew, valuenew)
            return updateBudget

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