import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import { router as serviceRouter } from "./routes/servico.route.js";
import { router as usersRouter } from "./routes/users.route.js";
import { router as orcamentoRouter } from "./routes/orcamento.route.js";
import { router as propostaRouter } from "./routes/proposta.route.js";
import { router as prestadorRouter } from "./routes/prestador.route.js";
import { router as prestacaoServicoRouter } from "./routes/prestacao-servico.route.js";
import { router as empresaRouter } from "./routes/empresa.route.js";
import { router as categoriaRouter } from "./routes/categoria.route.js";
import { swaggerSpec } from "./docs/swagger.js"
import { initDatabase } from "./lib/init-db.js"
import swaggerUi from "swagger-ui-express"
import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "./graphql/index.js";
import { expressMiddleware } from "@as-integrations/express5";
import statusMonitor from 'express-status-monitor';
import morgan from "morgan";

const app = express();

app.use(express.json()); // para interpretar o corpo das requisições como JSON

// liberta o front-end de aceder ao back-end
app.use(cors({

    origin: [
        "http://localhost:3000",
        "https://stiven-gulugulu.vercel.app",
        "https://bruno-gulugulu.vercel.app",
        "https://gulugulu-gray.vercel.app",
        "https://servidor-local-front-me74.vercel.app",
        "https://servidor-local-center-backend2.onrender.com",
        "https://servidor-local-front-ts.vercel.app",
        "https://servidor-local-center-three.vercel.app",
        "https://processo-kappa.vercel.app",
        "https://servidor-local-front-ghost.vercel.app",
        "https://gulugulu-teal.vercel.app",
        "https://servidor-local-front-ismar-dev.vercel.app",
        "https://servidor-local-front-ismar.vercel.app",
        "https://gulugulu-kappa.vercel.app",
        "https://gulugulu-two.vercel.app",
        "https://dev-05gulu.vercel.app",
        "https://gulugulu-mocha.vercel.app",
        "https://gulugulu-amber.vercel.app",
        "https://dev-gulugulu-ismael.vercel.app",
        "https://gulugulu-six.vercel.app",
        "https://gulugulu-nu.vercel.app",
        "https://gulugulu-lovat.vercel.app",
        "https://gulugulu-theta.vercel.app",
        "https://gulugulu-9kcz.vercel.app",
        "https://gulugulu-ten.vercel.app",
        "https://again-liart.vercel.app",
        "https://processo-kappa.vercel.app",
        "https://gulugulu-three.vercel.app",
        "https://gulugulu2.vercel.app"
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));

app.use(morgan("dev"));
app.use(statusMonitor());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// rota inicial do express
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

// rotas do express
app.use("/service", serviceRouter)
app.use("/users", usersRouter)
app.use("/orcamento", orcamentoRouter)
app.use("/proposta", propostaRouter)
app.use("/prestador", prestadorRouter)
app.use("/prestacao-servico", prestacaoServicoRouter)
app.use("/empresa", empresaRouter)
app.use("/categoria", categoriaRouter)

// rota da documentação swagger — serve spec JSON + Swagger UI
app.get("/docs-json", (req: Request, res: Response) => {
    res.json(swaggerSpec);
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { url: "/docs-json" },
}));

// ***************** graphql ***************** //
//cria o servidor graphql
const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
})

//cria a rota graphql
await graphqlServer.start();

app.use("/graphql", expressMiddleware(graphqlServer, {
    context: async ({ req }) => ({
        //verificar se o header de autorizacao existe
        token: req.headers.authorization,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
    }),
}))

// Criar tabelas na base de dados se não existirem
await initDatabase();

const PORT = Number(process.env.PORT) || 8080;

if (process.env.NODE_ENV === "development") {
    // inicia o servidor na porta 8080 com SSL
    const sslOptions = {
        key: fs.readFileSync('./cert/server.key'),
        cert: fs.readFileSync('./cert/server.cert')
    };

    https.createServer(sslOptions, app).listen(PORT, () => {
        console.log(`Servidor rodando em https://localhost:${PORT}`);
    });
} else {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}
