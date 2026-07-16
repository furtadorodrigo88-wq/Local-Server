import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 60,
  duration: "1m",
  thresholds: {
    // O teste FALHA se a taxa de erro for superior a 1%
    http_req_failed: ["rate<0.01"],
    // O teste FALHA se 95% dos pedidos demorarem mais de 500ms
   http_req_duration: ["p(95)<600"],
  },
};

export function setup() {
    //const loginURL = "https://servidor-local-center-backend-w1rr.onrender.com/users/login";
    const loginUrl = "http://api-2:8081/users/login"; // URL do endpoint a ser testado
    
    const payload = JSON.stringify({
        email: "rodrigo@gmail.com",
        password: "123456789"
    });
    
    const params = {
        headers: {
            "Content-Type": "application/json",
            "user-agent": "k6-load-teste",
            origin: "https://gulugulu-teal.vercel.app",
        }
    }

  const res = http.post(loginUrl, payload, params);

  return { token: res.json().data.token };
}

export default function (data) {
  const url = "http://api-2:8081/service/create";

  const payload = JSON.stringify({
      nome: "Servico de Limpeza",
      descricao: "Servico de Limpeza Profissional para residentes e empresa",
      categoria: "Limpeza",
      enabled_at: true
    })

    const params = {
        headers:{
            Authorization:`Bearer ${data.token}`,
            "Content-Type" : "application/json",
            "user-agent": "k6-load-teste",
        },
        user:{
            role: "admin"
        }
    }
    
    const res = http.post (url,payload,params)

    check(res, {
        "sucesso": (r) => r.status === 200,
        "Rapido (Tempo < 500ms)": (r) => r.timings.duration < 500,
        "erro de servidor (Erro 502/504)": (r) => r.status >= 500,
    });
    
    sleep(1);
}