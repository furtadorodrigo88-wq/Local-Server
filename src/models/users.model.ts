import type { get } from "node:http";
import db from "../lib/db.js";
import { formatDataDDMMYY } from "../utils/data.js";
import { hashPasseword } from "../utils/passeword.js";
import type { UserType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";


export const UserModel = {
    async create(newUser: UserType): Promise<UserType | null> {
        try {
            const query = "INSERT INTO tbl_utilizadores VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const value =[
                generateUUID(),
                newUser.nome,
                newUser.numero,
                formatDataDDMMYY(newUser.data_nascimento),
                newUser.email,
                newUser.telefone,
                newUser.pais,
                newUser.localidade,
                await hashPasseword(newUser.password),
                newUser.enabled,
                new Date(),
                new Date(),
                newUser.role
            ]
            console.log(value)
            const [user] = await db.execute(query, value)
            return (Array.isArray(user) ? user[0] : user) as UserType
        } catch (err) {
            console.error("Erro ao inserir utilizador:", err);
            return null;
        }
    },
    async getAll(): Promise<UserType[] | null> {
        try {
            const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")
            return rows as UserType[]
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async get(id: string): Promise<UserType | null> {
        try {
            const query = "SELECT * FROM tbl_utilizadores WHERE tbl_utilizadores.id = ?"
            const value = [id]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as UserType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async getByEmail(email: string): Promise<UserType | null> {
        try {
            const query = "SELECT * FROM tbl_utilizadores WHERE tbl_utilizadores.email = ?"
            const value = [email]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as UserType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async update(id: string, newUser: UserType): Promise<UserType | null> {
        try {
            const query = "UPDATE tbl_utilizadores SET nome=?, numero=?, data_nascimento=?, email=?, telefone=?, pais=?, localidade=?, password=?, enabled=?, updated_at=? WHERE id=?"
            const value =[
                newUser.nome,
                newUser.numero,
                formatDataDDMMYY(newUser.data_nascimento),
                newUser.email,
                newUser.telefone,
                newUser.pais,
                newUser.localidade,
                newUser.password,
                newUser.enabled,
                new Date(),
                id
            ]
            const [updatedUser] = await db.execute(query, value)
            return (Array.isArray(updatedUser) ? updatedUser[0] : updatedUser) as UserType
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async updatePassword(id: string, password: string): Promise<UserType | null> {
        try {
            const query ="UPDATE tbl_utilizadores SET password=?, updated_at=? WHERE id=?"
            const value =[
                await hashPasseword(password),
                new Date(),
                id
            ]
            const [updatedUser] = await db.execute(query, value)
            return (Array.isArray(updatedUser) ? updatedUser[0] : updatedUser) as UserType
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async delete(id: string): Promise<UserType | null> {
        try {
            const query = "DELETE FROM tbl_utilizadores WHERE id=?"
            const value = [id]
            const [rows] = await db.execute(query, value)
            if (Array.isArray(rows) && rows.length === 0) return null
            return (Array.isArray(rows) ? rows[0] : rows) as UserType
        } catch (err) {
            console.log(err)
            return null
        }
    }
}
