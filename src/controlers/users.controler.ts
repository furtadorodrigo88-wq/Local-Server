import db from "../lib/db.js"
import { UserModel } from "../models/users.model.js"
import type { Request, Response } from "express"
import { comparePasseword } from "../utils/passeword.js"
import type { ResponseType, UserType } from "../utils/types.js"
import jwt from "jsonwebtoken"


export const UserControler = {
    async createUser(req: Request, res: Response) {
        const query = req.body
        const insertUserResponse = await UserModel.create(query)
        if (!insertUserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar utilizador",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<UserType> = {
            status: "success",
            message: "Utilisador Inserido",
            data: insertUserResponse
        }
        res.status(200).json(response)
    },
    async getAll(req: Request, res: Response) {
        const getUsersResponse = await UserModel.getAll()
        if (!getUsersResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar utilizadores",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<UserType[]> = {
            status: "success",
            message: "Utilisadores encontrados",
            data: getUsersResponse
        }
        res.status(200).json(response)
    },
    async get(req: Request, res: Response) {
        const { id } = req.params
        if (id) {
            const getUserByIdResponse = await UserModel.get(id as string)
            if (!getUserByIdResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Utilizador nao emcontrado",
                    data: null
                }
                return res.status(404).json(response)
            }
            const response: ResponseType<UserType> = {
                status: "success",
                message: "Utilisador encontrado",
                data: getUserByIdResponse
            }
            res.status(200).json(response)
        } else {
            const response: ResponseType<null> = {
                status: "error",
                message: "id obrigatorrio",
                data: null
            }
            res.status(400).json(response)
        }
    },
    async update(req: Request, res: Response) {
        const id = req.params.id as string
        const newData = req.body
        const updateUserResponse = await UserModel.update(id, newData)
        if (!updateUserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<UserType> = {
            status: "success",
            message: "Utilisador atualizado",
            data: updateUserResponse
        }
        res.status(200).json(response)
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        const deleteuserResponse = await UserModel.delete (id as string)
        if (!deleteuserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar utilizador",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<UserType> = {
            status: "success",
            message: "Utilizador apagado",
            data: deleteuserResponse
        }
        return res.status(200).json(response)
    },
    async updatePassword(req: Request, res: Response) {
        const { id } = req.params
        const { passwordantiga, passwordnova, confirmarpassword } = req.body
        if (!id || !passwordantiga || !passwordnova || !confirmarpassword) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const userData: UserType | null = await UserModel.get(id as string)
        if (!userData) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador nao emcontrado",
                data: null
            }
            return res.status(404).json(response)
        }
        const isPassworValid = await comparePasseword(passwordantiga, userData.password as string)
        if (!isPassworValid) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Senha incorreta",
                data: null
            }
            return res.status(401).json(response)
        }
        const updatePasswordResponse = await UserModel.updatePassword(id as string, passwordnova as string)
        if (!updatePasswordResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar senha",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<UserType> = {
            status: "success",
            message: "Senha atualizada com sucesso",
            data: updatePasswordResponse
        }
        return res.status(200).json(response)
    },
    async login(req: Request, res: Response) {
        const { email, password } = req.body
        if (!email || !password) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Cridenciais invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const userData: UserType | null = await UserModel.getByEmail(email as string)
        if (!userData) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Nao existe nenhuma conta com esse email",
                data: null
            }
            return res.status(404).json(response)
        }
        const isPassworValid = await comparePasseword(password, userData.password as string)
        if (!isPassworValid) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Senha incorreta",
                data: null
            }
            return res.status(401).json(response)
        }
        const payLoad = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome,
            role: userData.role
        }
        const tuken = jwt.sign(payLoad, process.env.JWT_SECRET as string, { expiresIn: "1h" })
        const response: ResponseType<{user: typeof payLoad, token: string}> = {
            status: "success",
            message: "Login realizado com sucesso",
            data: {
                user: payLoad,
                token: tuken
            }
        }
        return res.status(200).json(response)
    }
}