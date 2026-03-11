INSERT INTO tbl_utilizadores (id,nome,numero,data_nascimento,email,telefone,pais,localidade,password,enabled,created_at,updated_at
)VALUE(
	"2ae29212-7b9a-4bb8-8501-49c022bf22ed",
	"Wilson Furtado",
    "M001K",
    "2005-03-22",
    "furtadorodrigo88@gmail.com",
    "9204186",
    "cabo Verde",
    "praia",
    "$2a$12$9hoEvbLWa257ITAD28lmEOhU9MRIESrkCnBFSUnBHthZK.Sh6iCgi",
    true,
    now(),
    now()
    );

INSERT INTO tbl_orcamento 
VALUE(
	NULL,
	200,
    "2ae29212-7b9a-4bb8-8501-49c022bf22ed",
    true,
    NOW(),
    NOW()
);

INSERT INTO tbl_servicos
VALUE (
	NULL,
    "Pedreiro",
    "comstrutor de infrestruturas",
    "construção sevil",
    true,
    NOW(),
    NOW()
);

INSERT INTO tbl_prestadores
VALUE (
	"62893380-5ef8-47f6-b284-223341dd8117",
    123455687,
    "Pedreiro",
    0.2,
    20000,
    0.1,
    true,
    true,
    NOW(),
    NOW()
);

INSERT INTO tbl_prestacao_servicos
VALUE(
	NULL,
    "",
    200000.5,
    12,
    "62893380-5ef8-47f6-b284-223341dd8117",
    1,
    22222,
    "pendente",
    1,
    true,
    NOW(),
    NOW()
);

INSERT INTO tbl_proposta
VALUE (
	NULL,
    1,
    20000,
    12,
    "pendente",
    true,
    NOW(),
    NOW()
);

INSERT INTO tbl_utilizadores 
VALUE(
	"9b0e1bb6-854f-4553-a892-d5d5630b579f",
	"Raven Pendragon",
    "m000k",
    "1000-01-01",
    "ravenpendragon@gmail.com",
    "0000000",
    "Pendragonia",
    "Capital",
    "$2a$12$SErVAS4bPN3fH..L7I7khe8MLJN5WBP86gaGFK20e1Ro8wtxXFLNC",
    true,
    now(),
    now()
    );