import db from "../lib/db.js";
import type { ProposalType } from "../utils/types.js";



export const proposalModel = {
    async create(newProposal: ProposalType) {
        try {
            const query = "INSERT INTO tbl_proposta (id_prestacao_servico,preco_hora,horas_estimadas,estado,enabled,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
            const value = [
                newProposal.id_prestacao_servico,
                newProposal.preco_hora,
                newProposal.horas_estimadas,
                newProposal.estado,
                newProposal.enabled,
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
            const query = "SELECT * FROM tbl_proposta"
            const rows = await db.execute(query)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async get(id: string) {
        try {
            const query = "SELECT * FROM tbl_proposta WHERE tbl_proposta.id = ?"
            const value = [id]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update (id: string, newProposal: ProposalType) {
        try {
            const query = "UPDATE tbl_proposta SET id_prestacao_servico=?,preco_hora=?,horas_estimadas=?,estado=?,enabled=?,updated_at=? WHERE id=?"
            const value = [
                newProposal.id_prestacao_servico,
                newProposal.preco_hora,
                newProposal.horas_estimadas,
                newProposal.estado,
                newProposal.enabled,
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
        const query = "DELETE FROM tbl_proposta WHERE id=?"
        const value = [id]
        const rows = await db.execute(query, value)
        return rows
    } catch (err) {
        console.log(err)
    }
    }
}