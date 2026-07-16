// import type { RowDataPacket } from "mysql2";
import db from "../lib/db-pg.js";
import type { PrestadorDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const PrestadorModel = {
    async create(prestador: PrestadorDBType): Promise<PrestadorDBType | null> {
        try {
            const query = `INSERT INTO tbl_prestadores 
            (id, taxa_urgencia, percentagem_desconto, minimo_desconto, nif, profissao, enable, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
            const values = [
                generateUUID(),
                prestador.taxa_urgencia,
                prestador.percentagem_desconto,
                prestador.minimo_desconto,
                prestador.nif,
                prestador.profissao,
                prestador.enable ?? true,
                new Date(),
                new Date()
            ];

            const result = await db.query<PrestadorDBType>(query, values);
            return result.rows[0] as PrestadorDBType;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async getAll(): Promise<PrestadorDBType[] | null> {
        try {
            const result = await db.query<PrestadorDBType>("SELECT * FROM tbl_prestadores");
            return result.rows as PrestadorDBType[];
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async get(id: string): Promise<PrestadorDBType | null> {
        try {
            const result = await db.query<PrestadorDBType>(
                `SELECT * FROM tbl_prestadores WHERE id = $1`, [id]
            );

            if (Array.isArray(result.rows) && result.rows.length === 0) return null;
            return Array.isArray(result.rows) ? result.rows[0] as PrestadorDBType : null;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async update(id: string, prestador: PrestadorDBType): Promise<PrestadorDBType | null> {
        try {
            const query = `UPDATE tbl_prestadores 
                SET taxa_urgencia = $1, 
                percentagem_desconto = $2, 
                minimo_desconto = $3, 
                nif = $4, 
                profissao = $5, 
                enable = $6, 
                updated_at = $7
                WHERE id = $8 
                RETURNING *`;
            const values = [
                prestador.taxa_urgencia,
                prestador.percentagem_desconto,
                prestador.minimo_desconto,
                prestador.nif,
                prestador.profissao,
                prestador.enable,
                new Date(),
                id
            ];

            const result = await db.query<PrestadorDBType>(query, values);
            return result.rows[0] as PrestadorDBType;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async delete(id: string): Promise<PrestadorDBType | null> {
        try {
            const result = await db.query(`DELETE FROM tbl_prestadores WHERE id = $1`, [id]);
            return result.rows[0] as PrestadorDBType;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async getPrecoHora(id: string): Promise<PrestadorDBType | null> {
        try {
            const query = `SELECT
                                p.id,
                                p.percentagem_desconto,
                                p.taxa_urgencia,
                                pr.preco_hora
                            FROM tbl_prestadores p
                            INNER JOIN tbl_proposta pr ON p.id = pr.id_prestador
                            WHERE p.id_utilizador = $1`;
            const value = [id];
            const result = await db.query<PrestadorDBType>(query, value);
            if (Array.isArray(result.rows) && result.rows.length === 0) return null;
            return Array.isArray(result.rows) ? result.rows[0] as PrestadorDBType : null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
};
