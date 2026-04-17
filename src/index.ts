import express, { type Request, type Response } from "express"
import { router as ServiceRouter } from "./routes/servico.route.js"
import { router as UserRouter } from "./routes/users.route.js"
import { router as ProviderRouter } from "./routes/prestador.route.js"
import { router as BudgetRouter } from "./routes/orcamento.route.js"
import { router as SPRouter } from "./routes/prestacao_servic.router.js"
import { router as ProposalRouter } from "./routes/proposta.route.js"
import { router as CategoryRouter } from "./routes/categoria.route.js"
import { router as CompanyRouter } from "./routes/empresa.route.js"
import { swaggerSpec } from "./docs/swagger.js"
import swaggerUI from "swagger-ui-express"
import dotenv from "dotenv"


const app = express()
app.use(express.json())

dotenv.config()

app.use("/service", ServiceRouter)
app.use("/users", UserRouter)
app.use("/provider", ProviderRouter)
app.use("/budget", BudgetRouter)
app.use("/serviceProv", SPRouter)
app.use("/proposal", ProposalRouter)
app.use("/category", CategoryRouter)
app.use("/company", CompanyRouter)

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})


app.listen(8080, () => {
    console.log("Server running on port 8080")
})
