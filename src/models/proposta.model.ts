
// import type { RowDataPacket } from "mysql2"
import db from "../lib/db-pg.js"
import type { PropostaDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const PropostaModel = {
    async create(proposta: PropostaDBType): Promise<PropostaDBType | null> {
        try {
            const result = await db.query<PropostaDBType>(
                `INSERT INTO tbl_proposta 
                (id, id_prestacao_servico, id_prestador, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,

                [
                    generateUUID(),
                    proposta.id_prestacao_servico,
                    proposta.id_prestador,
                    proposta.preco_hora,
                    proposta.horas_estimadas,
                    proposta.estado,
                    proposta.enabled,
                    new Date(),
                    new Date()
                ]
            )
            return result.rows[0] as PropostaDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<PropostaDBType[] | null> {
        const result = await db.query("SELECT * FROM tbl_proposta")

        return result.rows as PropostaDBType[]
    },

    async get(id: string): Promise<PropostaDBType | null> {
        try {
            const rows = await db.query<PropostaDBType[]>(
                `SELECT DISTINCT 
                pt.*,
                pr.id as ownwer
                FROM tbl_proposta pt
                INNER JOIN tbl_prestadores pr ON pt.id_prestador = pr.id
                INNER JOIN tbl_utilizadores u ON pr.id_utilizador = u.id
                WHERE pt.id = $1`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as PropostaDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, proposta: PropostaDBType) {
        try {
            const result = await db.query<PropostaDBType>(
                `UPDATE tbl_proposta
                SET id_prestacao_servico = $1, 
                id_prestador = $2,
                preco_hora = $3, 
                horas_estimadas = $4, 
                estado = $5, 
                enabled = $6, 
                updated_at = $7
                WHERE id = $8 RETURNING *`,

                [
                    proposta.id_prestacao_servico,
                    proposta.id_prestador,
                    proposta.preco_hora,
                    proposta.horas_estimadas,
                    proposta.estado,
                    proposta.enabled,
                    new Date(),
                    id
                ]
            )
            return result.rows[0] as PropostaDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    // trabalho final..................................................

    async aceitarProposta(id: string): Promise<PropostaDBType | null> {
        try {

            // 1. marcar proposta como aceite
            await db.query<PropostaDBType[]>(
                `UPDATE tbl_proposta SET estado = 'Aceite' WHERE id = $1`,
                [id]
            );

            // 2. buscar proposta
            const result = await db.query<PropostaDBType[]>(
                `SELECT * FROM tbl_proposta WHERE id = $1`,
                [id]
            );

            const proposta = result.rows[0];

            // 3. atualizar prestacao_servico
            await db.query<PropostaDBType[]>(
                `UPDATE tbl_prestacao_servico 
             SET estado = 'Aceite'
             WHERE id = $1`,
                [id]
            );

            // 4. rejeitar restantes propostas
            await db.query<PropostaDBType[]>(
                `UPDATE tbl_proposta 
             SET estado = 'Rejeitada'
             WHERE id_prestacao_servico = $1 AND id != $2`,
                [id]
            );

            return null;

        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async delete(id: string): Promise<PropostaDBType | null> {
        try {
            const result = await db.query<PropostaDBType>(
                `DELETE FROM tbl_proposta 
                WHERE id = $1`,

                [id]
            )

            return result.rows[0] as PropostaDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    // trabalho final..................................................

    async getByPrestacaoServico(idPrestacaoServico: string): Promise<PropostaDBType[] | null> {
        try {
            const result = await db.query<PropostaDBType>(
                `SELECT * FROM tbl_proposta 
                    WHERE tbl_proposta.id_prestacao_servico = $1`,
                [idPrestacaoServico]
            )
            if (result.rows.length === 0) return null
            return Array.isArray(result.rows) ? result.rows as PropostaDBType[] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async acceptProposal(id: string): Promise<PropostaDBType | null> {
        try {
            const result = await db.query<PropostaDBType>(
                `UPDATE tbl_proposta 
                SET estado = 'ACEITE' 
                WHERE id = $1`,
                [id])
            return result.rows[0] as PropostaDBType
        } catch (err) {
            console.log(err)
            return null
        }

    }
}


