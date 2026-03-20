import db from "../lib/db.js";
import { formatDataDDMMYY } from "../utils/data.js";
import { hashPasseword } from "../utils/passeword.js";
import type { UserType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";


export const UserModel = {
    async create(newUser: UserType) {
        try {
            const user = await db.execute("INSERT INTO tbl_utilizadores VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [
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
                new Date()
            ])
            return user
        } catch (err) {
            console.error("Erro ao inserir utilizador:", err);
            return null;
        }
    },
    async getAll() {
        const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")
        return rows
    },
    async get(id: string) {
        const [rows] = await db.execute("SELECT * FROM tbl_utilizadores WHERE tbl_utilizadores.id = ?", [id])
        if (Array.isArray(rows) && rows.length === 0) return null
        return Array.isArray(rows) ? rows[0] : null
    },
    async update (id: string, newUser: UserType) {
        try {
        const updatedUser = await db.execute("UPDATE tbl_utilizadores SET nome=?, numero=?, data_nascimento=?, email=?, telefone=?, pais=?, localidade=?, password=?, enabled=?, updated_at=? WHERE id=?", [
        newUser.nome,
        newUser.numero,
        formatDataDDMMYY (newUser.data_nascimento),
        newUser.email,
        newUser.telefone,
        newUser.pais,
        newUser.localidade,
        newUser.password,
        newUser.enabled,
        new Date(),
        id
    ])
    return updatedUser
    } catch (err) {
        console.log(err)
        return null
    }
    },
    async delete (id: string) {
        try {
        const query = "DELETE FROM tbl_utilizadores WHERE id=?"
        const value = [id]
        const rows = await db.execute(query, value)
        return rows
    } catch (err) {
        console.log(err)
    }
    }
}
