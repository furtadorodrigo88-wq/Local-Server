import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("Helo World");
    res.send("Helo World");
})

app.listen(8080, () => {
    console.log("server runing on port 8080")
})