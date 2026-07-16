
import db from "../lib/db-pg.js"
import { type PrestacaoServicoDetalhadoType, type PrestacaoServicoDBType, type PrestacaoServicoByCategoriaType } from "../utils/types.js"

export const PrestacaoServicoModel = {
    async create(prestacaoServico: PrestacaoServicoDBType): Promise<PrestacaoServicoDBType | null> {
        try {
            console.log({ prestacaoServico })
            const result = await db.query<PrestacaoServicoDBType>(
                `INSERT INTO tbl_prestacao_servico 
                (designacao, subtotal, horas_estimadas, id_prestador, id_utilizador, id_servico, preco_hora, estado, id_orcamento, id_empresa, tipo_prestador, urgente, enabled, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                RETURNING *`,

                [
                    prestacaoServico.designacao,
                    prestacaoServico.subtotal,
                    prestacaoServico.horas_estimadas,
                    prestacaoServico.id_prestador,
                    prestacaoServico.id_utilizador,
                    prestacaoServico.id_servico,
                    prestacaoServico.preco_hora,
                    prestacaoServico.estado,
                    prestacaoServico.id_orcamento,
                    prestacaoServico.id_empresa,
                    prestacaoServico.tipo_prestador,
                    prestacaoServico.urgente,
                    prestacaoServico.enabled,
                    new Date(),
                    new Date(),
                ]
            )
            console.log(result.rows)
            return result.rows[0] as PrestacaoServicoDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<PrestacaoServicoDBType[] | null> {
        const result = await db.query<PrestacaoServicoDBType[]>("SELECT * FROM tbl_prestacao_servico")

        return result.rows[0] as PrestacaoServicoDBType[]
    },

    async get(id: string): Promise<PrestacaoServicoDBType | null> {
        try {
            const result = await db.query<PrestacaoServicoDBType>(
                `SELECT * FROM tbl_prestacao_servico 
                WHERE tbl_prestacao_servico.id = $1`,

                [id]
            )

            if (Array.isArray(result.rows) && result.rows.length === 0) return null
            return Array.isArray(result.rows) ? result.rows[0] as PrestacaoServicoDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, prestacaoServico: PrestacaoServicoDBType) {
        try {
            const result = await db.query<PrestacaoServicoDBType>(
                `UPDATE tbl_prestacao_servico 
                SET designacao = $1, 
                subtotal = $2, 
                horas_estimadas = $3, 
                id_prestador = $4, 
                id_utilizador = $5,
                id_servico = $6, 
                preco_hora = $7, 
                estado = $8, 
                id_orcamento = $9, 
                id_empresa = $10,
                tipo_prestador = $11,
                urgente = $12,
                enabled = $13, 
                updated_at = $14
                WHERE id = $15
                RETURNING *`,

                [
                    prestacaoServico.designacao,
                    prestacaoServico.subtotal,
                    prestacaoServico.horas_estimadas,
                    prestacaoServico.id_prestador,
                    prestacaoServico.id_utilizador,
                    prestacaoServico.id_servico,
                    prestacaoServico.preco_hora,
                    prestacaoServico.estado,
                    prestacaoServico.id_orcamento,
                    prestacaoServico.id_empresa,
                    prestacaoServico.tipo_prestador,
                    prestacaoServico.urgente,
                    prestacaoServico.enabled,
                    new Date(),
                    id
                ]
            )
            console.log(result.rows)
            return result.rows[0] as PrestacaoServicoDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string): Promise<PrestacaoServicoDBType | null> {
        try {
            const result = await db.query<PrestacaoServicoDBType>(
                `DELETE FROM tbl_prestacao_servico 
                WHERE id = $1`,

                [id]
            )

            return result.rowCount === 0 ? null : result.rows[0] as PrestacaoServicoDBType
        } catch (err) {
            console.log(err)
            return null
        }
    },

    // trabalho final..................................................
    async getByIdOrcamento(idOrcamento: string): Promise<PrestacaoServicoDBType | null> {
        try {
            const result = await db.query<PrestacaoServicoDBType>(
                `SELECT * FROM tbl_prestacao_servico 
                WHERE tbl_prestacao_servico.id_orcamento = $1
                RETURNING *`,
                [idOrcamento]
            )
            if (Array.isArray(result.rows) && result.rows.length === 0) return null
            return Array.isArray(result.rows) ? result.rows[0] as PrestacaoServicoDBType : null
        }
        catch (error) {
            console.log(error)
            return null
        }
    },

    async getAllPrestacaoServicoDetalhado(limit: number, offset: number): Promise<PrestacaoServicoDetalhadoType[] | null> {
        try {
            const query = `
            SELECT 
            ps.id  as id.prestacao_servico, 
            ps.designacao as descricao,
            u.nome as nome_utilizador,
            u.email as email_utilizador,
            s.nome as nome_servico,
            ps.created_at as data_pedido,
            ps.urgente 
            FROM tbl_prestacao_servico ps
            INNER JOIN tbl_utilizadores u ON ps.id_utilizador = u.id
            INNER JOIN tbl_servicos s ON ps.id_servico = s.id
            ORDER BY ps.created_at DESC
            LIMIT $1 OFFSET $2;
            RETURNING *`
            const result = await db.query<PrestacaoServicoDetalhadoType[]>(
                query,
                [
                    limit.toString(),
                    offset.toString()
                ]
            )

            if (Array.isArray(result.rows) && result.rows.length === 0) return null
            return Array.isArray(result.rows) ? result.rows[0] as PrestacaoServicoDetalhadoType[] : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAllPrestacaoServicoByCategoriaDetalhado(idCategoria: string, limit: number, offset: number): Promise<PrestacaoServicoByCategoriaType[] | null> {
        try {
            const query = `
            SELECT 
            ps.id  as id.prestacao_servico, 
            ps.designacao as descricao,
            u.nome as nome_servico,
            c.designacao as nome_categoria,
            c.icone as icone_categoria,
            ps.created_at as data_pedido,
            ps.urgente 
            FROM tbl_prestacao_servico ps
            INNER JOIN tbl_categoria c ON c.id = s.id_categoria AND c.id = ?
            INNER JOIN tbl_servicos s ON ps.id_servico = s.id
            ORDER BY ps.created_at DESC
            LIMIT $1 OFFSET $2;
            RETURNING *`
            const result = await db.query<PrestacaoServicoByCategoriaType[]>(
                query,
                [
                    idCategoria,
                    limit.toString(),
                    offset.toString()
                ]
            )

            if (Array.isArray(result.rows) && result.rows.length === 0) return null
            return Array.isArray(result.rows) ? result.rows[0] as PrestacaoServicoByCategoriaType[] : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAllPrestacaoServicoByCategoria(limit: number, offset: number, categoria: string) {
        try {
            const query = `
                SELECT 
                    ps.id as id_prestacao_servico,
                    ps.designacao as descricao,
                    u.nome as nome_utilizador, 
                    u.email as email_utilizador,
                    s.nome as nome_servico,
                    ps.created_at as data_pedido,
                    ps.urgente
                FROM table_prestacao_servico ps
                INNER JOIN table_servicos s ON ps.id_servico = s.id
                INNER JOIN table_categoria c ON s.id_categoria = c.id
                ORDER BY ps.created_at DESC
                LIMIT $1 OFFSET $2
                WHERE cd.id = $3
                RETURNING *`

            const result = await db.query<PrestacaoServicoDetalhadoType[]>(
                query,
                [

                    limit.toString(),
                    offset.toString(),
                    categoria
                ]
            )

            if (Array.isArray(result.rows) && result.rows.length === 0) return null
            return Array.isArray(result.rows) ? result.rows[0] as PrestacaoServicoDetalhadoType[] : null
        } catch (err) {
            console.log(err)
            return null
        }
    }
}