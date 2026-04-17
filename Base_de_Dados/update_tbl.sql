UPDATE tbl_utilizadores
SET nome = "Pedro Paulo"
WHERE id="51441882-e587-459c-9a26-44938d8f53e5";

ALTER TABLE tbl_utilizadores
ADD CONSTRAINT uq_email UNIQUE (email);


ALTER TABLE tbl_empresa
ADD CONSTRAINT fk_utilizador_empresa
foreign key(id_utilizador)
references tbl_utilizadores(id)
;
alter table tbl_servicos
drop column categoria,
add column id_categoria integer after descricao,
add constraint fk_categoria_servico
foreign key (id_categoria)
references tbl_categoria(id);

alter table tbl_prestacao_servicos
add column id_empresa integer,
add column tipo_prestador enum("particular","empresa"),
add constraint fk_empresa_prestacao_servico
foreign key (id_empresa)
references tbl_empresa(id)
;

ALTER TABLE tbl_utilizadores
ADD COLUMN `role` ENUM ("cliente","adimin","prestador","empresa") default "cliente"
;

ALTER TABLE tbl_prestadores
ADD COLUMN id_empresa INTEGER AFTER percentagem_desconto,
ADD COLUMN id_utilizador VARCHAR(255) NOT NULL DEFAULT "9b0e1bb6-854f-4553-a892-d5d5630b579f" AFTER id_empresa,
ADD CONSTRAINT fk_utilizadores_prestadores
FOREIGN KEY (id_utilizador)
REFERENCES tbl_utilizadores(id);


