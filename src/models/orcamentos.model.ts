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
            const query = `
            SELECT ps.preco_hora, ps.horas_estimadas, 
            p.taxa_Urgencia, p.percentagem_desconto
            FROM tbl_prestacao_servicos ps
            JOIN tbl_prestadores p ON ps.id_prestador = p.id
            WHERE ps.id_orcamento = ?
        `;
            const [services] = await db.execute(query, [id]) as [any[], any];
            if (!services || services.length === 0) {
                return null;
            }
            let total = 0;
            services.forEach((item: any) => {
                let subtotal = item.preco_hora * item.horas_estimadas;
                if (item.taxa_Urgencia) {
                    subtotal += subtotal * item.taxa_Urgencia;
                }
                if (item.percentagem_desconto) {
                    subtotal -= subtotal * item.percentagem_desconto;
                }
                total += subtotal;
            });
            const updateQuery = "UPDATE tbl_orcamento SET total=?, updated_at=? WHERE id=?";
            await db.execute(updateQuery, [total, new Date(), id]);
            return { id, total };
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    ,
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