SELECT * FROM tbl_utilizadores;

SELECT id, nome FROM tbl_utilizadores;

SELECT tbl_utilizadores.id, tbl_prestadores.id FROM tbl_utilizadores, tbl_prestadores;

SELECT * FROM tbl_utilizadores, tbl_prestadores;

SELECT
	tbl_orcamento.id,
    tatal,
    tbl_utilizadores.id,
    nome
FROM
	tbl_orcamento,
    tbl_utilizadores
WHERE
	tbl_orcamento.id_utilizadores = "2ae29212-7b9a-4bb8-8501-49c022bf22ed";
    
SELECT * FROM tbl_servicos;

SELECT * FROM tbl_utilizadores WHERE id = "2ae29212-7b9a-4bb8-8501-49c022bf22ed";

SELECT * FROM tbl_prestadores WHERE nif = "123455687";