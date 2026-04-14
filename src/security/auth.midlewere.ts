import type { Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: string;
            }
        }
    }
}



export default function authMidlewere (req: Request, res: Response, next: NextFunction) {
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
        const decodedToken = Jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string, email: string, role: string }
        req.user = {
            id: decodedToken.id,
            email: decodedToken.email,
            role: decodedToken.role
        }
        next()
        
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Token invalido",
            data: null
        })
    }

}
export function authorize (roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                status: "error",
                message: "Utilizador nao authenticado",
                data: null
            })
        }
        const userRole = req.user.role
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                status: "error",
                message: "Nao autorizado",
                data: null
            })
        }
        next()
    }
}