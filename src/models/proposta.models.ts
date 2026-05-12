import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { AcceptProposalType, ProposalType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";



export const proposalModel = {
    async create(newProposal: ProposalType): Promise<ProposalType | null> {
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
            const [result] = await db.execute<ProposalType[] & RowDataPacket[]>(query, value);
            return result[0] as ProposalType;
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAll(): Promise<ProposalType[] | null> {
        try {
            const query = "SELECT * FROM tbl_proposta"
            const rows = await db.execute(query)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as ProposalType[] : []
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async get(id: string): Promise<ProposalType | null> {
        try {
            const query = `
            SELECT DISTINCT 
                pt.*,
                u.id as owner
            FROM tbl_proposta pt
            INNER JOIN tbl_prestadores pr ON pt.id_prestador = pr.id
            INNER JOIN tbl_utilizadores u ON pr.id_utilizador = u.id
            WHERE pt.id = ?
            `
            const value = [id]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as ProposalType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update(id: string, newProposal: ProposalType): Promise<ProposalType | null> {
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
            if (Array.isArray(result) && result.length === 0) return null
            return Array.isArray(result) ? result[0] as ProposalType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async acceptProposal(id: string): Promise<AcceptProposalType[] | null> {
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
            await db.execute(upProposalQuery, upProposalValue);
            const upPSQuery = "UPDATE tbl_prestacao_servicos SET estado = 'pendente', updated_at=? WHERE id=?"
            const upPSValue = [new Date(), id_prestacao_servico]
            await db.execute(upPSQuery, upPSValue);
            const upProposalRejectQuery = "UPDATE tbl_proposta SET estado = 'Rejeitada', updated_at=? WHERE id_prestacao_servico=? AND id<>?"
            const upProposalRejectvalue = [new Date(), id_prestacao_servico, id]
            await db.execute(upProposalRejectQuery, upProposalRejectvalue);

            return [{ id, id_orcamento, id_prestacao_servico, estado: "aceite" }] as AcceptProposalType[];
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    async delete(id: string): Promise<ProposalType | null> {
        try {
            const query = "DELETE FROM tbl_proposta WHERE id=?"
            const value = [id]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as ProposalType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getByServceProv(idPrestacaoServico: string): Promise<ProposalType[] | null> {
        try {
            const query = "SELECT * FROM tbl_proposta WHERE tbl_proposta.id_prestacao_servico = ?"
            const value = [idPrestacaoServico]
            const [rows] = await db.execute<ProposalType[] & RowDataPacket[]>(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getByUserId(idUser: string): Promise<ProposalType[] | null> {
        try {
            const query = "SELECT * FROM tbl_proposta WHERE id_prestador IN (SELECT id FROM tbl_prestadores WHERE id_utilizador = ?)"
            const value = [idUser]
            const [rows] = await db.execute<ProposalType[] & RowDataPacket[]>(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows : null
        } catch (err) {
            console.log(err)
            return null
        }
    }
}