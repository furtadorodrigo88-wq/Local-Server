import db from "../lib/db.js";
import type { ProposalType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";



export const proposalModel = {
    async create(newProposal: ProposalType) {
        try {
            const query = "INSERT INTO tbl_proposta (id,id_prestacao_servico,preco_hora,horas_estimadas,estado,enabled,created_at,updated_at, id_prestador) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)"
            const value = [
                null,
                newProposal.id_prestacao_servico,
                newProposal.preco_hora,
                newProposal.horas_estimadas,
                newProposal.estado,
                newProposal.enabled,
                new Date(),
                new Date(),
                newProposal.id_prestador
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
        console.log(rows[0])
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
    async update(id: string, newProposal: ProposalType) {
        try {
            const query = "UPDATE tbl_proposta SET id_prestacao_servico=?,preco_hora=?,horas_estimadas=?,estado=?,enabled=?,updated_at=?, id_prestador=? WHERE id=?"
            const value = [
                newProposal.id_prestacao_servico,
                newProposal.preco_hora,
                newProposal.horas_estimadas,
                newProposal.estado,
                newProposal.enabled,
                new Date(),
                newProposal.id_prestador,
                id
            ]
            const [result] = await db.execute(query, value);
            return result;
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async acceptProposal(id: string) {
        try {
            const selectQuery = "SELECT * FROM tbl_proposta WHERE id = ?"
            const selectValue = [id]
            const [rows] = await db.execute(selectQuery, selectValue) as [any[], any];
            if (!rows || rows.length === 0) {
                return null;
            }
            const { id_orcamento, id_prestacao_servico } = rows[0];
            const upProposalQuery = "UPDATE tbl_proposta SET estado = 'aceite', updated_at=? WHERE id=?"
            const upProposalValue = [new Date(), id]
            await db.execute(upProposalQuery,upProposalValue);
            const upPSQuery = "UPDATE tbl_prestacao_servicos SET estado = 'pendente', updated_at=? WHERE id=?"
            const upPSValue =[new Date(), id_prestacao_servico]
            await db.execute(upPSQuery, upPSValue);
            const upProposalRejectQuery ="UPDATE tbl_proposta SET estado = 'Rejeitada', updated_at=? WHERE id_prestacao_servico=? AND id<>?"
            const upProposalRejectvalue = [new Date(), id_prestacao_servico, id]
            await db.execute(upProposalRejectQuery, upProposalRejectvalue);

            return { id, id_orcamento, id_prestacao_servico, estado: "aceite" };
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    async delete(id: string) {
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