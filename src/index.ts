import express, {type Request, type Response} from "express";
import {adicionarServico, apagarservico, listarServicos} from "./sevico.js";

const app = express(); 
app.use(express.json());

app.get("/", (req: Request, res:Response) => {
    console.log("Helo World");
    res.send("Helo World");
});

// Rota para adicinar novo servico
app.post("/adicionar-servico", ( req: Request, res: Response) => {
    const novoServico = req.body
    console.log(novoServico)
    const addServicoreponce = adicionarServico(novoServico)
    res.json(addServicoreponce)
});


//Rota para listar todos os servicos
app.get("/listar-servico",(req: Request, res: Response) => {
    const listarServicoReponse = listarServicos()
    res.json(listarServicoReponse)
})


//Rota para apagar um servico
app.delete("/apagar-servico",(req: Request, res: Response) => {
    const { nome } = req.query
    if(nome) {
    const apagarservicoResponce = apagarservico(nome as string)
    res.json(apagarservicoResponce)
    } else {
        res.json({
            menssage:"nome do servico e obrigatorio"
        })
    }
})


app.listen(8080, () => {
    console.log("server runing on port 8080")
});