import express, { type Request, type Response } from "express"
import { apagarPrestadorServico, calcularOrcamento, criarPrestadorDeServico, editarPrestadorServico, listarPrestadoresServicos, selecionarPrestador, selecionarServicos } from "./orcamento.js"
import { adicionarServico, apagarServico, getServiceById, getService, insertService, listarServicos, obterServico, updateService, DeleteService, } from "./sevico.js"
import { json } from "node:stream/consumers"
import { DeleteUsers, getUserById, getUsers, insertUser, updateUser } from "./user.js"
import { getServers } from "node:dns"
import type { Servicetype } from "./utils/types.js"
import { createProvider, getprovider, getproviderById, Prestador } from "./prestador.js"

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


//=============================== reformulaçao de rota==========================================

//======================================User==============================


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
})


//inserir utilisador no bd
app.patch("/insert-User", async (req: Request, res: Response) => {
    const query = req.body
    const insertUserResponse = await insertUser(query)
    res.status(200).json({
        status: "success",
        message: "Utilisador Inserido",
        data: insertUserResponse
    })
})



//atualizar utilizador pelo id
app.put("/update-User", async (req: Request, res: Response) => {
    const id = req.query.id as string
    const newData = req.body
    const updateUserResponse = await updateUser(id, newData)
    res.status(200).json({
        status: "success",
        message: "Utilisador atualizado",
        data: updateUserResponse
    })
})

//deletar utilisador pelo id
app.delete("/delete-user", (req: Request, res: Response) => {
    const { id } = req.query

    if (!id) {
        return res.status(400).json({
            status: "error",
            mensage: "ID obrigatorio",
            data: null
        })
    }

    const deleteuserResponse = DeleteUsers(id as string)
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
})

//=======================service================================

//selecionar todos os servicos presente no base de dados
app.get("/get-service", async (req: Request, res: Response) => {
    const getServiceResponse = await getService()
    if (!getServiceResponse) {
        return res.status(404).json({
            status: "erro",
            message: "ID obrigatorio",
            data: null
        })
    }
    res.json({
        status: "success",
        message: "Utilisador encontrado",
        data: getServiceResponse
    })
})


//selecionar sevico pelo id
app.get("/get-service-by-id", async (req: Request, res: Response) => {
    const { id } = req.query
    const getserviceByIdResponse = await getServiceById(id as string)
    if (!id) {
        return res.status(404).json({
            status: "erro",
            message: "ID obrigatorio",
            data: null
        })
    }
    res.status(200).json({
        status: "success",
        message: "Utilisador encontrado",
        data: getserviceByIdResponse
    })
})


//inserir servico no bd
app.patch("/insert-Service", async (req: Request, res: Response) => {
    const newservice: Servicetype = req.body
    if (!newservice) {
        return res.status(400).json({
            status: "error",
            mensage: "Dados de servico invalido",
            data: null
        })
    }
    const insertServeceResponse = await insertService(newservice)
    if (!insertServeceResponse) {
        return res.status(400).json({
            status: "error",
            menssage: "Erro ao criar servico",
            data: null
        })
    }
    res.status(200).json({
        status: "success",
        message: "Servico Inserido",
        data: insertServeceResponse
    })
})

//atualizar servico pelo id
app.put("/update-Service", async (req: Request, res: Response) => {
    const { id } = req.query
    const newData: Servicetype = req.body
    if (!id) {
        return res.status(400).json({
            status: "error",
            mensage: "ID obrigatorio",
            data: null
        })
    }

    if (!newData) {
        return res.status(400).json({
            status: "error",
            mensage: "Dados de servico invalidos",
            data: null
        })
    }

    const updateServiceResponse = await updateService(id as string, newData)
    if (!updateServiceResponse) {
        return res.status(400).json({
            status: "error",
            mensage: "Dados de servico invalidos",
            data: null
        })
    }
    return res.status(200).json({
        status: "success",
        message: "Servico atualizado",
        data: updateServiceResponse
    })
})

//deletar servico pelo id
app.delete("/delete-service", (req: Request, res: Response) => {
    const { id } = req.query

    if (!id) {
        return res.status(400).json({
            status: "error",
            mensage: "ID obrigatorio",
            data: null
        })
    }

    const deleteuserviceResponse = DeleteService(id as string)
    if (!deleteuserviceResponse) {
        return res.status(400).json({
            status: "error",
            mensage: "ID obrigatorio",
            data: null
        })
    }
    return res.status(200).json({
        status: "success",
        message: "Servico apagado",
        data: deleteuserviceResponse
})
})



//=============================provider=====================================

//selecionar todos os provedores presente no base de dados
app.get("/get-provider", async (req: Request, res: Response) => {
    const getProviderResponse = await getprovider()
    if (!getProviderResponse) {
        return res.status(404).json({
            status: "erro",
            message: "Nenhum provedor encontrado",
            data: null
        })
    }
    res.json({
        status: "success",
        message: "Provedores encontrados",
        data: getProviderResponse
    })
})


//selecionar provedor pelo id
app.get("/get-provider-by-id", async (req: Request, res: Response) => {
    const { id } = req.query
    const getproviderByIdResponse = await getproviderById(id as string)
    if (!id) {
        return res.status(404).json({
            status: "erro",
            message: "ID obrigatorio",
            data: null
        })
    }
    res.status(200).json({
        status: "success",
        message: "Utilisador encontrado",
        data: getproviderByIdResponse
    })
})

//inserir provedor no bd
app.patch("/insert-provider", async (req: Request, res: Response) => {
    const newprovider: Prestador = req.body
    if (!newprovider) {
        return res.status(400).json({
            status: "error",
            mensage: "Dados de servico invalido",
            data: null
        })
    }
    const insertproviderResponse = await createProvider(newprovider)
    if (!insertproviderResponse) {
        return res.status(400).json({
            status: "error",
            menssage: "Erro ao criar servico",
            data: null
        })
    }
    res.status(200).json({
        status: "success",
        message: "Servico Inserido",
        data: insertproviderResponse
    })
})