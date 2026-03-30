import db from "../lib/db.js"
import { UserModel } from "../models/users.model.js"
import type { Request, Response } from "express"
import { comparePasseword } from "../utils/passeword.js"
import type { UserType } from "../utils/types.js"
import jwt from "jsonwebtoken"


export const UserControler = {
    async createUser(res: Response, req: Request) {
        const query = req.body
        const insertUserResponse = await UserModel.create(query)
        res.status(200).json({
            status: "success",
            message: "Utilisador Inserido",
            data: insertUserResponse
        })
    },
    async getAll(req: Request, res: Response) {
        const getUsersResponse = await UserModel.getAll()
        res.json(getUsersResponse)
    },
    async get(req: Request, res: Response) {
        const { id } = req.query
        if (id) {
            const getUserByIdResponse = await UserModel.get(id as string)
            if (!getUserByIdResponse) {
                res.status(404).json({
                    status: "erro",
                    message: "Utilizador nao emcontrado",
                    data: null
                })
            }
            res.status(200).json({
                status: "success",
                message: "Utilisador encontrado",
                data: getUserByIdResponse
            })
        } else {
            res.status(400).json({
                status: "erro",
                message: "id obrigatorrio",
                data: null
            })
        }
    },
    async update(req: Request, res: Response) {
        const id = req.query.id as string
        const newData = req.body
        const updateUserResponse = await UserModel.update(id, newData)
        res.status(200).json({
            status: "success",
            message: "Utilisador atualizado",
            data: updateUserResponse
        })
    },
    async delete(req: Request, res: Response) {
        const { id } = req.query

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensage: "ID obrigatorio",
                data: null
            })
        }

        const deleteuserResponse = UserModel.delete(id as string)
        if (!deleteuserResponse) {
            return res.status(400).json({
                status: "error",
                mensage: "ID obrigatorio",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Utilizador apagado",
            data: deleteuserResponse
        })
    },
    async login(res: Response, req: Request) {
        const { email, password } = req.body
        if (!email || !password){
            return res.status(400).json({
                status: "error",
                message: "Cridenciais invalidos",
                data: null
            })
        }
        const userData: UserType | null = await UserModel.getByEmail ( email as string )
        if (!userData) {
            return res.status(404).json({
                status: "error",
                message: "Nao existe nenhuma conta com esse email",
                data: null
            })
        }
        const isPassworValid = await comparePasseword (password, userData.password as string)
        if (!isPassworValid) {
            return res.status(401).json({
                status: "error",
                message: "Senha incorreta",
                data: null
            })
        }
        const payLoad ={
            id: userData.id,
            email: userData.email,
            nome: userData.nome
        }
        const tuken = jwt.sign (payLoad, process.env.JWT_SECRET as string, {expiresIn: "1h"})
    }
    }