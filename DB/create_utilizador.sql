USE servidor_local;

CREATE TABLE IF NOT EXISTS tabela_utilizadores (
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    numero_identificacao VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    pais VARCHAR(100) NOT NULL,
    localidade VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);
