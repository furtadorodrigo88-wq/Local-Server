import express, {type Request, type Response} from "express";
import { addServicoDB, AdicionarServico, ApagarServico, deleteService, getAllServices, getServiceById, ListarServico, obterServico, updateService } from "./servico.js";
import { CalcularOrcamento, criarPrestadorDeServico, SelecionarPrestador, SelecionarServicos } from "./orcamento.js";
import {GetUsers, GetUserById, InsertUser} from "../users.js";
import { get } from "node:http";
import type { ServicoDBType } from "../utils/types.js";

const app = express();
app.use(express.json())



/*app.post('/',(req: Request, res: Response) => {
    console.log("Hello World");
    res.send("Hello World");
});*/

// rota para adicionar
app.post("/adicionar-servico", (req: Request, res: Response) =>{
    const servico = req.body;
    const addServicoResponse = AdicionarServico(servico);
    res.json(addServicoResponse)
})



app.get("/listAll", (req: Request, res: Response)=>{
    const listServicoResponse = ListarServico();
    res.json(listServicoResponse)
})




app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query;

    if(nome){
        const apagarServicoResponse = ApagarServico(nome as string);
        res.json(apagarServicoResponse);
    }
    else{
        res.json({
            message: "Nome do serviço em falta"
        }
    )}
})




app.get("/obter-servico", (req: Request, res: Response) => {
    const {nome} = req.query;

    if(nome){
        const obterServicoResponse = obterServico(nome as string);
        res.json(obterServicoResponse);
    }
    else{
        res.json({
            message: "Nome é necessário"
        });
    }
})




app.post("/selecionar-servico", (req: Request, res: Response) =>{
    const { nome } = req.body;
    
    const SelecionarServicoResponse = SelecionarServicos(nome);
    res.json(SelecionarServicoResponse);
})




app.post("/calcular-orcamento", (req: Request, res: Response) =>{
    const { pedido } = req.body;

    
    const CalcularOrcamentoResponse = CalcularOrcamento(pedido);
    res.json(CalcularOrcamentoResponse);
})




app.post("/criar-prestador", (req: Request, res: Response) =>{
    
    const prestador = req.body; 
    const selecionarPrestadorResponse = criarPrestadorDeServico(prestador);
    res.json(selecionarPrestadorResponse);
})




app.post("/selecionar-prestador", (req: Request, res: Response) =>{
    const { nome } = req.body;
    
    const selecionarPrestadorResponse = SelecionarPrestador(nome);
    res.json(selecionarPrestadorResponse);
})




app.get("/get-users", async (req:Request, res: Response) => {
    const getUsersResponse = await GetUsers();

    res.json(getUsersResponse);
})




app.get("/get-users-by-id", async (req:Request, res: Response) => {
    const {id} = req.query;

    if(!id){
        res.json({
            message:    "ID obrigatório"
        })}

    const getUserByIdResponse = await GetUserById(id as string);

    if(!getUserByIdResponse){
        res.status(404).json({
            status:     "Sucess",
            message:    "Usuário não encontrado",
            data:       null,
        })}

    res.status(200).json({
        status:         "sucess",
        message:        "Usuário encontrador",
        data:           getUserByIdResponse
    })
})

app.post("/insert-users", async (req:Request, res: Response) => {
    const user = req.body;

    if(!user){
        res.json({
            message:    "Dados obrigatório"

        })}

    const InsertUserResponse = await InsertUser(user!)

    if(!InsertUserResponse){
        return res.status(400).json({
            status:     "Success",
            message:    "Não foi possível inserir usuário",
            data:        null,
        })}

    res.status(200).json({
        status:         "success",
        message:        "Usuário Inserido",
        data:           InsertUserResponse
    })
})

"#############################"


app.post("/create-service",async(req:Request, res:Response)=>{
  const newService: ServicoDBType = req.body

  if (!newService) {
    res.status(400).json({
      status: "error",
      message: "Dados de servicos invalidos",
      data: null
    })

    return
 }
  console.log(newService)
  const createServiceResponse = await addServicoDB(newService)
  if (createServiceResponse === null) {
    return res.status(400).json({
      status: "error",
      message: "Erro ao criar servico",
      data: null
    })
  }

  res.status(200).json({
      status: "success",
      message: "Servico Criado  com sucesso",
      data: createServiceResponse
    })
})


app.get("/get-service-by-id", async (req: Request, res: Response)=>{
  const {id} = req.params

  if (!id) {
    return res.status(400).json({
      status: "error",
       message: "ID obrigatorio",
       data: null
    })
  }

  const getServiceByIdResponse = await getServiceById(id as string)

  if (!getServiceByIdResponse) {
     return res.status(400).json ({
      status: "Error",
      message : "Servico nao encontrado",
      data: null
     })
  }
 res.status(200).json({
      status: "success",
      message: "Servico encontrado",
      data: getServiceByIdResponse
    })

})


app.get("/get-all-services", async (req: Request, res: Response)=>{
  const getAllServicesResponse = await getAllServices()

  if (!getAllServicesResponse) {
    return res.status(400).json({
      status: "error",
       message: "Erro ao selecionar servicos",
       data: null
    })
  }

 res.status(200).json({
      status: "success",
      message: "Servicos encontrados",
      data: getAllServicesResponse
    })

})


app.put("/update-service-by-id/:id", async (req: Request, res: Response)=>{
  const {id} = req.params

  const updatedService: ServicoDBType = req.body

  if (!id) {
    return res.status(400).json({
      status: "error",
       message: "ID obrigatorio",
       data: null
    })

  }

  if (!updatedService) {
    return res.status(400).json({
      status: "error",
       message: "Dados de servicos invalidos",
       data: null
    })
  }

const updateServiceResponse = await updateService(id as string, updatedService)

if (!updateServiceResponse) {
    return res.status(400).json({
      status: "error",
       message: "Erro ao atualizar servico",
       data: null
    })
  }

  return res.status(200).json({
    status: "success",
    message: "servico atualizado com sucesso",
    data: updateServiceResponse
  })


})


app.delete("/delete-service-by-id/:id", async (req: Request, res: Response)=>{
  const {id} = req.params
 if (!id) {
    return res.status(400).json({
      status: "error",
       message: "ID obrigatorio",
       data: null
    })
 }

  const deleteServiceResponse = await deleteService(id as string)

  if (!deleteServiceResponse) {
    return res.status(400).json({
      status: "error",
       message: "Erro ao atualizar servico",
       data: null
    })
  }
  return res.status(200).json({
    status: "success",
    message: "servico atualizado com sucesso",
    data: deleteServiceResponse
 })
})



app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});