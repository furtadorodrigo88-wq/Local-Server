SELECT * FROM tabela_utilizadores ;

SELECT id, nome FROM tabela_utilizadores;

SELECT * FROM tabela_utilizadores,tabela_prestadores;

SELECT tabela_utilizadores.id ,tabela_prestadores.id FROM tabela_utilizadores, tabela_prestadores;

SELECT 
tabela_orcamento.id,
total,
tabela_utilizadores.id,
nome
FROM 
tabela_orcamento,
tabela_utilizadores
WHERE
tabela_orcamento.id_utilizador="c30fd356-a476-4bab-a649-ae8bf2849f47";

SELECT *FROM tabela_servicos;

SELECT * 
FROM tabela_utilizadores
 WHERE tabela_utilizadores.id="63a3303c-b1cc-42c9-aa1d-88606de0fa20";
 
 