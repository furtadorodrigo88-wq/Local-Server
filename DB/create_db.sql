CREATE DATABASE IF NOT EXISTS servidor_local;
USE servidor_local;

CREATE TABLE IF NOT EXISTS tabela_prestadores (
    id VARCHAR(255) PRIMARY KEY,
    nif INT NOT NULL,
    profissao VARCHAR(100) NOT NULL,
    taxa_urgencia DECIMAL(10,3) DEFAULT 0,
    minimo_desconto DECIMAL(10,3) DEFAULT 0,
    percentagem_desconto DECIMAL(10,3) DEFAULT 0,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

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

CREATE TABLE IF NOT EXISTS tabela_servicos (
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS tabela_orcamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total DOUBLE NOT NULL,
    id_utilizador VARCHAR(255) NOT NULL,
    id_prestador VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    CONSTRAINT fk_orcamento_utilizador
        FOREIGN KEY (id_utilizador) REFERENCES tabela_utilizadores(id),
    CONSTRAINT fk_orcamento_prestador
        FOREIGN KEY (id_prestador) REFERENCES tabela_prestadores(id)
);

CREATE TABLE IF NOT EXISTS tabela_prestacao_servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    designacao VARCHAR(255) NOT NULL,
    subtotal DOUBLE NOT NULL,
    horas_estimadas INT NOT NULL,
    id_prestador VARCHAR(255) NOT NULL,
    id_servico VARCHAR(255) NOT NULL,
    preco_hora DOUBLE NOT NULL,
    estado ENUM('pendente', 'em progresso', 'completo', 'cancelado') NOT NULL,
    id_orcamento INT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    CONSTRAINT fk_prestador_servico
        FOREIGN KEY (id_prestador) REFERENCES tabela_prestadores(id),
    CONSTRAINT fk_servico_referencia
        FOREIGN KEY (id_servico) REFERENCES tabela_servicos(id),
    CONSTRAINT fk_orcamento_referencia
        FOREIGN KEY (id_orcamento) REFERENCES tabela_orcamento(id)
);

CREATE TABLE IF NOT EXISTS tabela_proposta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_prestacao_servico INT NOT NULL,
    preco_hora DOUBLE NOT NULL,
    horas_estimadas INT NOT NULL,
    estado ENUM('pendente', 'em progresso', 'completo', 'cancelado') NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    CONSTRAINT fk_proposta_prestacao
        FOREIGN KEY (id_prestacao_servico) REFERENCES tabela_prestacao_servicos(id)
);

CREATE TABLE IF NOT EXISTS`tabela_empresa`(
	id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    designacao VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    localizacao VARCHAR(255) NOT NULL,
    nif DOUBLE NOT NULL UNIQUE,
    icone VARCHAR(255),
    id_utilizador VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
    );
    
    CREATE TABLE tabela_categoria (
    id  INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    designacao VARCHAR(255) NOT NULL,
    icom  VARCHAR (255),
    crteated_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
    );
    ALTER TABLE tabela_prestadores
    ADD COLUMN id_utilizador VARCHAR(255) NOT NULL DEFAULT"63a3303c-b1cc-42c9-aa1d-88606de0fa20",
    ADD CONSTRAINT fk_utilizador_prestadores
    FOREIGN KEY (id_utilizador)
    REFERENCES tabela_utilizadores(id)
    ;
    
    ALTER TABLE tabela_empresa
    ADD CONSTRAINT fk_utilizador_empresa
    FOREIGN KEY (id_utilizador)
    REFERENCES tabela_utilizadores(id)
    ;
    
    
    ALTER TABLE tabela_servicos
       DROP COLUMN categoria,
       ADD COLUMN id_categoria INTEGER AFTER desconto,
       ADD CONSTRAINT fk_categoria_servico
       FOREIGN KEY  (id_categoria)
       REFERENCES tabela_categoria(id)
       ;
       
       
	ALTER TABLE tabela_prestacao_servicos
       ADD COLUMN urgente BOOLEAN AFTER id_orcamento
       ;
       
       
	ALTER TABLE tabela_proposta
    ADD CONSTRAINT fk_prestacao_servico_proposta
    FOREIGN KEY (id_prestacao_servico)
    
    ;
    
    ALTER TABLE tabela_prestadores
    ADD COLUMN id_empresa INTEGER,
    ADD CONSTRAINT fk_empresa_prestadores
    FOREIGN KEY (id_empresa)
    REFERENCES tabela_empresa(id)
    ;
    
     ALTER TABLE tabela_utilizadores
     ADD COLUMN `role` ENUM("cliente", "admin","prestador","empresa") default"cliente"
     ;

