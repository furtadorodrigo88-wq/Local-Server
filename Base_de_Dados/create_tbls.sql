USE servidor_local;

CREATE TABLE tbl_prestadores(
	id VARCHAR(255) PRIMARY KEY NOT NULL,
    nif INT NOT NULL,
    precoHora DECIMAL(10, 2),
    profissao VARCHAR(100) NOT NULL,
    minimoDesconto DECIMAL(10, 2),
    taxaUrgencia DECIMAL(10, 3),
    percentagemDesconto DECIMAL(10, 3), 
    estado BOOLEAN NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);
ALTER TABLE tbl_prestadores
	DROP COLUMN taxaUrgencia,
	ADD COLUMN taxa_Urgencia DECIMAL (10,3) AFTER profissao,
	DROP COLUMN minimoDesconto,
	ADD COLUMN minimo_desconto DECIMAL(10, 3) AFTER taxa_urgencia,
	DROP COLUMN percentagemDesconto,
	ADD COLUMN percentagem_desconto DECIMAL(10,3) AFTER minimo_desconto,
	DROP COLUMN precoHora
;
 

CREATE TABLE tbl_utilizadores(
	id VARCHAR(255) PRIMARY KEY NOT NULL,
    nome VARCHAR(50) NOT NULL,
    numero VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(13),
    pais VARCHAR(100) NOT NULL,
    localidade VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE tbl_servicos(
	id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(255),
    categoria VARCHAR(20) NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_orcamento (
	id	 INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	tatal DOUBLE NOT NULL,
	id_utilizadores VARCHAR(255) NOT NULL,
	enabled BOOLEAN NOT NULL,
	created_at DATETIME,
	updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS tbl_prestacao_servicos (
	id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	disign VARCHAR(255) NOT NULL,
	subtotal DOUBLE NOT NULL,
	horas_estimadas INTEGER NOT NULL,
	id_prestador VARCHAR(255) NOT NULL,
	id_servico INTEGER NOT NULL,
	preco_hora DOUBLE NOT NULL,
	estado ENUM('pendente','em progresso' , 'completo', 'cancelado') NOT NULL,
	id_orcamento INTEGER NOT NULL,
	enabled BOOLEAN NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS tbl_proposta (
	id INTEGER	PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	id_prestacao_servico INTEGER NOT NULL,
	preco_hora DOUBLE NOT NULL,
	horas_estimadas INTEGER NOT NULL,
	estado ENUM('pendente','em progresso' , 'completo', 'cancelado'),
	enabled BOOLEAN,
	created_at DATETIME,
	updated_at DATETIME
);

ALTER TABLE tbl_proposta
ADD CONSTRAINT fk_prestacao_servico_proposta
FOREIGN KEY(id_prestacao_servico)
REFERENCES tbl_prestacao_servicos(id)
;

ALTER TABLE tbl_prestacao_servicos
ADD CONSTRAINT fk_prestador_prestacao_servico
FOREIGN KEY (id_prestador)
REFERENCES tbl_prestadores(id),
ADD CONSTRAINT fk_servico_prestacao_servico
FOREIGN KEY (id_servico)
REFERENCES tbl_servicos(id)
;

ALTER TABLE tbl_proposta
ADD COLUMN id_prestador VARCHAR(255) NOT NULL,
ADD CONSTRAINT fk_tbl_prestadores_proposta
FOREIGN KEY (id_prestador)
REFERENCES tbl_prestadores(id)
;

CREATE TABLE IF NOT EXISTS tbl_empresa (
	id INTEGER PRIMARY KEY NOT NULL,
	designacao VARCHAR(255) NOT NULL,
	descricao VARCHAR(255),
	localizacao varchar(255),
	nif DOUBLE NOT NULL UNIQUE,
	icone VARCHAR(255),
	id_utilizador VARCHAR(255) NOT NULL,
	enabled BOOLEAN,
	created_at DATETIME,
	updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS tbl_categoria (
	id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    designacao varchar(255) NOT NULL,
    icone VARCHAR(255),
    created_at DATETIME,
	updated_at DATETIME
);


