import db from "../lib/db.js"
import { UserModel } from "../models/users.model.js"
import type { Request, Response } from "express"


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
        const updateUserResponse = await UserModel.update (id, newData)
        res.status(200).json({
            status: "success",
            message: "Utilisador atualizado",
            data: updateUserResponse
        })
    },
    async delete(req: Request, res:Response){
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
    }

}