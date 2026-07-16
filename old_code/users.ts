import db from "./lib/db.js";
import { Hash_Password } from "./utils/password_hash.js";
import type { UserType } from "./utils/types.js"
import generateUUID from "./utils/uuid_generate.js";



export async function GetUsers(){

    const [rows] = await db.execute(
        "SELECT * FROM table_utilizadores");

    return rows;
}




export async function GetUserById(id: string){

    const [rows] = await db.execute(
        `SELECT * FROM table_utilizadores
        WHERE table_utilizadores,id = ?`,
    [id]);

    if(Array.isArray(rows) && rows.length === 0) return null;
    return Array.isArray(rows) ? rows[0] : null;
}




export async function InsertUser(user: UserType){
`
    const agora = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = 
    INSERT INTO table_utilizadores (
        id, nome, numero_identificacao, data_nascimento, email, 
        password, telefone, pais, localidade, enabled, 
        created_at, update_at
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    let values = [
                    user.id,
                    user.nome,
                    user.numero_identificacao, 
                    user.data_nascimento, 
                    user.email, 
                    user.password, 
                    user.telefone, 
                    user.pais, 
                    user.localidade,
                    user.enabled, 
                    agora, 
                    agora];
              
console.log(values.length)
    try{
        
        const [rows] =  await db.query(query, values)
        return rows;
    }
    catch(err){
       console.log("dgh",err);
       return null;
    }`

    const data_atual = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = `INSERT INTO table_utilizadores (id, nome, numero_identificacao, data_nascimento, email, password, telefone, pais, localidade, enabled, created_at, update_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        generateUUID(),
        user.nome,
        user.numero_identificacao,
        String(user.data_nascimento), 
        user.email,
        await Hash_Password(user.password),
        user.telefone,
        user.pais,
        user.localidade,
        user.enabled ? 1 : 0, 
        data_atual, 
        data_atual 
    ];

    try {
        const [rows] = await db.execute(query, values);
        return rows;
    } catch (err) {
        console.error("Erro Fatal:", err);
        return null;
    }
}
    