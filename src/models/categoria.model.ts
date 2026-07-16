
import db from "../lib/db-pg.js";
import type { CategoriaDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const CategoriaModel = {
    async create(categoria: CategoriaDBType): Promise<CategoriaDBType | null> {
        try {
            const id = generateUUID();
            await db.query(
                `INSERT INTO tbl_categoria (id, designacao, icone, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5)`,
                [
                    id,
                    categoria.designacao,
                    categoria.icone,
                    new Date(),
                    new Date(),
                ]
            );

            return {
                id,
                designacao: categoria.designacao,
                icone: categoria.icone,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            } as CategoriaDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<CategoriaDBType[] | null> {
        try {
            const result = await db.query<CategoriaDBType[]>(
                `SELECT * FROM tbl_categoria`
            );
            return result.rows[0] as CategoriaDBType[];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<CategoriaDBType | null> {
        try {
            const result = await db.query<CategoriaDBType>(
                `SELECT * FROM tbl_categoria WHERE id = $1`,
                [id]
            );

            if (Array.isArray(result.rows) && result.rows.length === 0) return null;
            return Array.isArray(result.rows) ? result.rows[0] as CategoriaDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, categoria: CategoriaDBType): Promise<CategoriaDBType | null> {
        try {
            await db.query(
                `UPDATE tbl_categoria
                SET designacao = $1, icone = $2, updated_at = $3
                WHERE id = $4
                 RETURNING *`,
                [
                    categoria.designacao,
                    categoria.icone,
                    new Date(),
                    id,
                ]
            );

            return {
                id,
                designacao: categoria.designacao,
                icone: categoria.icone,
                created_at: categoria.created_at,
                updated_at: new Date().toISOString(),
            } as CategoriaDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string): Promise<CategoriaDBType | null> {
        try {
            const result = await db.query(
                `DELETE FROM tbl_categoria WHERE id = $1`,
                [id]
            );

            return result.rows[0] as CategoriaDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
