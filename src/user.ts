import db from "./lib/db.js"
import type { UserType } from "./utils/types.js"


// pegar dados de utilizador
export async function getUsers() {
    const [ rows ] = await db.execute("SELECT * FROM tbl_utilizadores")
    return rows
};

//pegar dados de utilizador atravez de id
export async function getUserById (id: string) {
    const [ rows ] = await db.execute("SELECT * FROM tbl_utilizadores WHERE tbl_utilizadores.id = ?", [id])
    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows [0] : null
}

//colocar um novo utilizador
export async function insertUser ( utilizador: UserType ) {
    try{
    const user = await db.execute("INSERT INTO tbl_utilizadores VALUE(?,?,?,?,?,?,?,?,?,?,?,?)", [
        null,
        utilizador.nome,
        utilizador.numero,
        utilizador.data_nascimento,
        utilizador.email,
        utilizador.telefone,
        utilizador.pais,
        utilizador.localidade,
        utilizador.password,
        utilizador.enabled,
        new Date(),
        new Date()
    ])
    return user
}catch (err) {
    console.error("Erro ao inserir utilizador:", err);
    return null;

}
}

//atualizar utilizador atravez do id
export async function updateUser (id: string, utilizador: UserType) {
    try {
        const updatedUser = await db.execute("UPDATE tbl_utilizadores SET nome=?, numero=?, data_nascimento=?, email=?, telefone=?, pais=?, localidade=?, password=?, enabled=?, updated_at=? WHERE id=?", [
        utilizador.nome,
        utilizador.numero,
        utilizador.data_nascimento,
        utilizador.email,
        utilizador.telefone,
        utilizador.pais,
        utilizador.localidade,
        utilizador.password,
        utilizador.enabled,
        new Date(),
        id
    ])
    return updatedUser
    } catch (err) {
        console.log(err)
        return null
    }
    
}


// delete utilizador pelo id
export async function DeleteUsers (id: string) {
    try {
        const query = "DELETE FROM tbl_utilizadores WHERE id=?"
        const value = [id]
        const rows = await db.execute(query, value)
        return rows
    } catch (err) {
        console.log(err)
    }
    
}