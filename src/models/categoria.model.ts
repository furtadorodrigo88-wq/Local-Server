import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { CategoryType } from "../utils/types.js";

/*export interface CategoryType {
    id: string
    designacao: string
    icone: string
    created_at: string
    updated_at: string
}*/



export const CategoryModel = {
    async create(newcategory: CategoryType): Promise<CategoryType | null> {
        try {
            const query = "INSERT INTO tbl_categoria (id, designacao, icone, created_at, updated_at) VALUES (?,?, ?, ?, ?)"
            const value = [
                null,
                newcategory.designacao,
                newcategory.icone,
                new Date(),
                new Date()
            ]
            const [result] = await db.execute <CategoryType & RowDataPacket[]>(query, value);
            return result as CategoryType;
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getAll(): Promise<CategoryType[] | null> {
        try {
            const query = "SELECT * FROM tbl_categoria"
            const rows = await db.execute<CategoryType[] & RowDataPacket[]>(query)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as CategoryType[] : []
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async get(id: string): Promise<CategoryType | null> {
        try {
            const query = "SELECT * FROM tbl_categoria WHERE tbl_categoria.id = ?"
            const value = [id]
            const [rows] = await db.execute<CategoryType & RowDataPacket[]>(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as CategoryType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update(id: string, newcategory: CategoryType): Promise<CategoryType | null> {
        try {
            const query = "UPDATE tbl_categoria SET designacao=?, icone=?, updated_at=? WHERE id=?"
            const value = [
                newcategory.designacao,
                newcategory.icone,
                new Date(),
                id
            ]
            const [result] = await db.execute<CategoryType & RowDataPacket[]>(query, value);
            return result as CategoryType;
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async delete(id: string): Promise<CategoryType | null> {
        try {
            const query = "DELETE FROM tbl_categoria WHERE id=?"
            const value = [id]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return (Array.isArray(rows) ? rows[0] : rows) as CategoryType
        } catch (err) {
            console.log(err)
            return null
        }
    }
}