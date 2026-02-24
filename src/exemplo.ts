interface AlunosType {
    nome: string;
    endereco: string;
    contacto?: string | null
}
const aluno:Array<AlunosType> = [
    {
        nome: "Tiago",
        endereco: "Rua A",
        contacto: "123456789"
    }
]

let horasTrabalhadas:number = 10;
let precoHora: number = 10;
let taxaUregencia: number = 10;
let desconto: number = 10;
let total: number = 10;

let variavel: string = "variavel";
desconto === taxaUregencia && desconto > taxaUregencia ? taxaUregencia += desconto : taxaUregencia -= desconto;
total = (horasTrabalhadas * precoHora) + taxaUregencia - desconto;

  