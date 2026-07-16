import db from "../lib/db-pg.js";
import type { OrcamentoDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const OrcamentoModel = {
    async create(orcamento: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {
            const query = `INSERT INTO tbl_orcamento (id, total, id_utilizadores, enabled, created_at, updated_at) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            const values = [
                generateUUID(),
                orcamento.total,
                orcamento.id_utilizadores,
                orcamento.enabled ?? true,
                new Date(),
                new Date()
            ];
            
            const result = await db.query<OrcamentoDBType>(query, values);
            
            

            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async getAll(): Promise<OrcamentoDBType[]> {
        try {
            const result = await db.query<OrcamentoDBType>("SELECT * FROM tbl_orcamento");
            return result.rows;
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    async get(id: string): Promise<OrcamentoDBType | null> {
        try {
            const result = await db.query<OrcamentoDBType>(
                `SELECT * FROM tbl_orcamento WHERE id = $1`,
                [id]
            );

            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async update(id: string, orcamento: Partial<OrcamentoDBType>): Promise<OrcamentoDBType | null> {
        try {
            const query = `UPDATE tbl_orcamento SET total = $1, id_utilizadores = $2, enabled = $3, updated_at = $4 WHERE id = $5 RETURNING *`;
            const values = [
                orcamento.total,
                orcamento.id_utilizadores,
                orcamento.enabled,
                new Date(),
                id
            ];
                
            const result = await db.query<OrcamentoDBType>(query, values);
            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async delete(id: string): Promise<OrcamentoDBType | null> {
        try {
            const result = await db.query<OrcamentoDBType>(`DELETE FROM tbl_orcamento WHERE id = $1 RETURNING *`, [id]);
            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async updateBudget(id: string, total: number): Promise<OrcamentoDBType | null> {
        try {
            const result = await db.query<OrcamentoDBType>(
                `UPDATE tbl_orcamento SET total = $1, updated_at = $2 WHERE id = $3 RETURNING *`,
                [total, new Date(), id]
            );
            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};
