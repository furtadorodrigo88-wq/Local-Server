import express, { type Request, type Response } from "express"
import { calcularOrcamento, criarPrestadorDeServico, selecionarPrestador, selecionarServicos } from "./orcamento.js"
import { adicionarServico, apagarServico, listarServicos, obterServico, } from "./sevico.js"
import { json } from "node:stream/consumers"

const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

// rota para adicionar um serviço novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body

    const addServicoResponse = adicionarServico(novoServico)

    res.json(addServicoResponse)
})


// rota para criar prestador
app.post("/criar-prestador", (req: Request, res: Response) => {
    const novoPrestador = req.body
    const addPrestador = criarPrestadorDeServico(novoPrestador)
    res.json(addPrestador)
})

// rota para listar todos os servicos
app.get("/listar-servicos", (req: Request, res: Response) => {
    const listServicoResponse = listarServicos()

    res.json(listServicoResponse)
})

// rota para apagar um servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query

    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string)

        res.json(apagarServicoResponse)
    } else {
        res.json({
            message: "Nome do servico eh obrigatorio"
        })
    }
})

// rota para obter servico pelo nome 
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query

    if (nome) {
        const obterServicoResponse = obterServico(nome as string)

        res.json(obterServicoResponse)
    } else {
        res.json({
            message: "Nome do servico eh obrigatorio"
        })
    }
})

// rota para selecionar servicos
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body

    const selecinarServicoResponse = selecionarServicos(nome as string)

    res.json(selecinarServicoResponse)
})


// rota para selecionar prestador
app.post("/selecionar-prestador",(req: Request, res: Response) => {
    const { nome } = req.body
    const selecionarPrestadorResponse = selecionarPrestador (nome as string)
    res.json(selecionarPrestadorResponse)
})





// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body

    const calcularOrcamentoresponse = calcularOrcamento(pedido)

    res.json({
        mensage: "Orçamento calculado com sucesso",
        orcamentoTotal: calcularOrcamentoresponse})
})

app.listen(8080, () => {
    console.log("Server running on port 8080")
})