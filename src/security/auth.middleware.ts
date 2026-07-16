import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

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

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    // "Bearer", "qwertyuioplkjhgfdsazxcvbnm"

    if (!authHeader) {
        return res.status(401).json({
            status: "error",
            message: "Utilizador nao autenticado",
        });
    }
    const token = authHeader.split(" ")[1];
    // ["Bearer", "qwertyuioplkjhgfdsazxcvbnm"]

    try {
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string; email: string; role: string };

        req.user = {
            id: decodedToken?.id,
            email: decodedToken?.email,
            role: decodedToken?.role,
        }

        next();
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Token inválido",
        });
    }
}

// RBAC - Role Based Access Control
export function authorize(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Utilizador nao autenticado" })
        }
        if (!roles.includes(req.user.role.toLowerCase())) {
            return res.status(403).json({ message: "Permissao insuficiente" });
        }

        next();
    }
}

export function isOwner(model: any, field: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id;
        const { id } = req.params;
        const entity = await model.get(id as string);

        if (!entity) {
            return res.status(404).json({ message: "Entidade nao encontrada" });
        }

        if (!userId) return res.status(401).json({ message: "Utilizador nao autenticado" });
        
        if(entity[field] !== userId) return res.status(403).json({ message: "Permissao insuficiente" });

        next();
    }   
}
