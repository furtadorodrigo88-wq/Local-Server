import type { Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"


export default function authGuard (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({
            status: "error",
            message: "Token nao fornecido",
            data: null
        })
    }
    const token = authHeader.split(" ")[1]
    try {
        const decodedToken = Jwt.verify(token as string, process.env.JWT_SECRET as string)
        next()
        
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Token invalido",
            data: null
        })
    }
}