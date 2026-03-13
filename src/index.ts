import express, { type Request, type Response } from "express"
import { apagarPrestadorServico, calcularOrcamento, criarPrestadorDeServico, editarPrestadorServico, listarPrestadoresServicos, selecionarPrestador, selecionarServicos } from "./orcamento.js"
import { adicionarServico, apagarServico, getServceById, getService, listarServicos, obterServico, } from "./sevico.js"
import { json } from "node:stream/consumers"
import { getUserById, getUsers, insertUser, updateUser } from "./user.js"
import { getServers } from "node:dns"

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
app.post("/selecionar-prestador", (req: Request, res: Response) => {
    const { nome } = req.body
    const selecionarPrestadorResponse = selecionarPrestador(nome as string)
    res.json(selecionarPrestadorResponse)
})

//rota para listar todos os prestadores de servico
app.get("/listar-prestadores", (req: Request, res: Response) => {
    const listPrestadoresServicoResponse = listarPrestadoresServicos()

    res.json(listPrestadoresServicoResponse)
})

//rota para apagar prestador
app.delete("/apagar-prestador", (req: Request, res: Response) => {
    const { nome } = req.query

    if (nome) {
        const apagarPrestadorResponse = apagarPrestadorServico(nome as string)

        res.json(apagarPrestadorResponse)
    } else {
        res.json({
            message: "Nome do Prestador eh obrigatorio"
        })
    }
})

//rota para editar prestador de servico
app.put("/editar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador, novosDadosDoPrestador } = req.body

    const editarPrestadorServicoReponse = editarPrestadorServico(nomeDoPrestador as string, novosDadosDoPrestador)

    res.json(editarPrestadorServicoReponse)
})

//selecionar todos os utilizadores presente no base de dados
app.get("/get-users", async (req: Request, res: Response) => {
    const getUsersResponse = await getUsers()
    res.json(getUsersResponse)
})

//selecionar utilizador pelo id
app.get("/get-users-by-id", async (req: Request, res: Response) => {
    const { id } = req.query
    if (id) {
        const getUserByIdResponse = await getUserById(id as string)
        if (!getUserByIdResponse){
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
})


//inserir utilisador no bd
app.patch("/insert-User", async (req: Request, res: Response) => {
    const query = req.body
    const insertUserResponse = await insertUser (query)
    res.status(200).json({
            status: "success",
            message: "Utilisador Inserido",
            data: insertUserResponse
        })
})


//atualizar utilizador pelo id
app.put("/update-User", async (req: Request, res: Response) => {
    const id  = req.query.id as string
    const newData = req.body
    const updateUserResponse = await updateUser (id, newData)
    res.status(200).json({
            status: "success",
            message: "Utilisador atualizado",
            data: updateUserResponse
        })
})


//selecionar todos os servicos presente no base de dados
app.get("/get-service", async (req: Request, res: Response) => {
    const getServiceResponse = await getService ()
    res.json(getServiceResponse)
})


//selecionar sevico pelo id
app.get("/get-service-by-id", async (req: Request, res: Response) => {
    const { id } = req.query
    if (id) {
        const idNumber = Number (id)
        const getserviceByIdResponse = await getServceById (idNumber)
        if (!getserviceByIdResponse){
            res.status(404).json({
                status: "erro",
                message: "Utilizador nao emcontrado",
                data: null
            })
        }
        res.status(200).json({
            status: "success",
            message: "Utilisador encontrado",
            data: getserviceByIdResponse
        })
    } else {
        res.status(400).json({
            status: "erro",
            message: "id obrigatorrio",
            data: null
        })
}
})





// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body

    const calcularOrcamentoresponse = calcularOrcamento(pedido)

    res.json({
        mensage: "Orçamento calculado com sucesso",
        orcamentoTotal: calcularOrcamentoresponse
    })
})

app.listen(8080, () => {
    console.log("Server running on port 8080")
})