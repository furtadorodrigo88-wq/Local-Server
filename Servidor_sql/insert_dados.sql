INSERT INTO table_utilizadores(
id,
nome,
numero_identificacao,
data_nascimento,
email,
`password`,
telefone,
pais,
localidade,
enabled,
created_at,
update_at
) VALUES (
	"bb7152af-0881-4b53-9685-12ecfbd27307",
	"Kristian Alves",
    "GRR468",
    "2006-03-20",
    "kristianalves307@gmail.com",
    "$2a$11$OkIAMm5ZnI5IbR8pBLdhjOoL58zpU6//YTC2evr7tt/oLQKcD3eXu",
    "9870901",
    "Cabo Verde",
    "Praia",
    True,
    NOW(),
    NOW()
    );
    
    
INSERT INTO table_orcamento(
id,
valor_total,
id_utilizadores,
enabled,
created_at,
updated_at
) VALUES(
	NULL,
    989,
    "bb7152af-0881-4b53-9685-12ecfbd27307",
    True,
    NOW(),
    NOW());
    
    
    
ALTER TABLE table_proposta
	ADD COLUMN id?prestador
    
    