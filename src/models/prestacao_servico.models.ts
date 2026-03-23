import db from "../lib/db.js";
import type { ServiceProvType } from "../utils/types.js";


export const serviceProvModel = {
    async create(newSP: ServiceProvType) {
        try {
            const query = "INSERT INTO tbl_prestacao_servicos (disign, subtotal, horas_estimadas, id_prestador, id_servico, preco_hora, estado, id_orcamento, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            const value = [
                newSP.disign,
                newSP.subtotal,
                newSP.horas_estimadas,
                newSP.id_prestador,
                newSP.id_servico,
                newSP.preco_hora,
                newSP.estado,
                newSP.id_orcamento,
                newSP.enabled,
                new Date (),
                new Date ()
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
            const query = "SELECT * FROM tbl_prestacao_servicos"
            const rows = await db.execute(query)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async get(id: string) {
        try {
            const query = "SELECT * FROM tbl_prestacao_servicos WHERE tbl_prestacao_servicos.id = ?"
            const value = [id]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update (id: string, newSP: ServiceProvType) {
        try {
            const query = "UPDATE tbl_prestacao_servicos SET disign=?, subtotal=?, horas_estimadas=?, id_prestador=?, id_servico=?, preco_hora=?, estado=?, id_orcamento=?, enabled=?, updated_at=?  WHERE id=?"
            const value = [
                newSP.disign,
                newSP.subtotal,
                newSP.horas_estimadas,
                newSP.id_prestador,
                newSP.id_servico,
                newSP.preco_hora,
                newSP.estado,
                newSP.id_orcamento,
                newSP.enabled,
                new Date (),
                id
            ]
            const [result] = await db.execute(query, value);
            return result;
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async delete (id: string) {
        try {
        const query = "DELETE FROM tbl_prestacao_servicos WHERE id=?"
        const value = [id]
        const rows = await db.execute(query, value)
        return rows
    } catch (err) {
        console.log(err)
    }
    }
}