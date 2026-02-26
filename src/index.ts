import express from "express";
import {adicionarServico} from "./sevico.js";

const app = express(); 

app.get("/", (req, res) => {
    console.log("Helo World");
    res.send("Helo World");
})


app.post("/adicionar-servico", ( req, res) => {
    const novoServico = req.body
    adicionarServico(novoServico)
})


app.listen(8080, () => {
    console.log("server runing on port 8080")
})