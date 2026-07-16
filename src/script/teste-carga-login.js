import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 20, // número de usuários virtuais
  duration: "30s", // duração do teste
};

export default function () {
  // const url = "https://servidor-local-center-backend2.onrender.com/users/login"; // URL do endpoint a ser testado
  const url = "http://api:8080/users/login"; // URL do endpoint a ser testado

    const payload = JSON.stringify({
        email: "wilson@gmail.com",
        password: "123456789",
    });

  // const headers = {
  //   "Content-Type": "application/json",
  // };

  const params = {
    headers: {
      "Content-Type": "application/json",
      Origin: "https://gulugulu-teal.vercel.app", // <-- Finge que és o teu Frontend!
      "User-Agent": "k6-load-test",
    },
  };

  const response = http.post(url, payload, params);
  if (response.status !== 200) {
    console.log(
      `ERRO! Status: ${response.status} | Resposta do Servidor: ${response.body}`,
    );
  }

  check(response, {
    "Login Bem-sucedido": (r) => r.status === 200,
    "Login Rapido (Tempo < 500ms)": (r) => r.timings.duration < 500, // tempo de resposta menor que 500ms
    "CPU Esgotado (Erro 502/504)": (r) => r.status >= 500, // não deve retornar erro de CPU esgotado
  });

  sleep(1); // espera 1 segundo entre as requisições
}

// const payload = JSON.stringify({
//   email: "admin@marketplace.com",
//   password: "password123",
// });

// // 1. A SOLUÇÃO DO CORS: Adicionar o 'Origin' ou 'Referer'
// const params = {
//   headers: {
//     "Content-Type": "application/json",
//     Origin: "https://teu-frontend-na.vercel.app", // <-- Finge que és o teu Frontend!
//     "User-Agent": "k6-load-test",
//   },
// };

// const res = http.post(url, payload, params);

// // 2. A SOLUÇÃO DA CEGUEIRA: Se não for 200, mostra-me o erro real!
// if (res.status !== 200) {
//   console.log(
//     `🚨 ERRO! Status: ${res.status} | Resposta do Servidor: ${res.body}`,
//   );
// }

// check(res, {
//   "Login com Sucesso (Status 200)?": (r) => r.status === 200,
//   // ... resto dos teus checks
// });
