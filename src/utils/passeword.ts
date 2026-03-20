import { hash,compare } from "bcrypt";

export async function hashPasseword (passwordEmTexto: string) {
    return await hash (passwordEmTexto, 12)
}

export async function comparePasseword (passwordEmTexto: string, hashPasseword: string) {
    return await compare (passwordEmTexto, hashPasseword)
}