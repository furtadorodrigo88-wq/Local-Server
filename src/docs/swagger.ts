import { url } from "node:inspector"
import swaggerJsdoc from "swagger-jsdoc"
import path from "path"


const opitions: swaggerJsdoc.Options = {
    definition:{
        openia: "3.0.0",
        info: {
            title: "API Servidor Local",
            description: "Plataforma de Gestão de Prestação de Serviços",
            version: "1.0.0"
        },
        servers: [
            {
                url: 'https://localhost:8080',
                descripition: 'dev',
            }
        ],
        apis: [
            path.join(process.cwd(), "./src/docs/schemas/*.yaml"),
            path.join(process.cwd(), "./src/docs/paths/*.yaml"),
        ]
    }
}

export const swaggerSpec = swaggerJsdoc(opitions);