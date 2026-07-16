USE servidor_local;

INSERT INTO tabela_utilizadores (
    id,
    nome,
    numero_identificacao,
    data_nascimento,
    email,
    telefone,
    pais,
    localidade,
    password,
    enabled,
    created_at,
    updated_at
) VALUES (
    '63a3303c-b1cc-42c9-aa1d-88606de0fa20',
    'Joao Silva',
    'M001',
    '1995-02-10',
    'joao@gmail.com',
    '9911111',
    'Cabo Verde',
    'Praia',
    '123456',
    TRUE,
    NOW(),
    NOW()
);

INSERT INTO tabela_prestadores (
    id,
    nif,
    profissao,
    taxa_urgencia,
    minimo_desconto,
    percentagem_desconto,
    enabled,
    created_at,
    updated_at
) VALUES (
    '380337bd-f2b9-4f86-b586-04dd9e1ab058',
    123456789,
    'canalizador',
    0.3,
    100,
    0.1,
    TRUE,
    NOW(),
    NOW()
);

INSERT INTO tabela_servicos (
    id,
    nome,
    descricao,
    categoria,
    enabled,
    created_at,
    updated_at
) VALUES (
    'serv1',
    'Instalacao de canalizacao',
    'Servico de instalacao e manutencao de canalizacao',
    'canalizacao',
    TRUE,
    NOW(),
    NOW()
);

INSERT INTO tabela_orcamento (
    total,
    id_utilizador,
    id_prestador,
    enabled,
    created_at,
    updated_at
) VALUES (
    200,
    '63a3303c-b1cc-42c9-aa1d-88606de0fa20',
    '380337bd-f2b9-4f86-b586-04dd9e1ab058',
    TRUE,
    NOW(),
    NOW()
);

INSERT INTO tabela_prestacao_servicos (
    designacao,
    subtotal,
    horas_estimadas,
    id_prestador,
    id_servico,
    preco_hora,
    estado,
    id_orcamento,
    enabled,
    created_at,
    updated_at
) VALUES (
    'Instalacao de tubos',
    100,
    5,
    '380337bd-f2b9-4f86-b586-04dd9e1ab058',
    'serv1',
    20,
    'pendente',
    1,
    TRUE,
    NOW(),
    NOW()
);

INSERT INTO tabela_proposta (
    id_prestacao_servico,
    preco_hora,
    horas_estimadas,
    estado,
    enabled,
    created_at,
    updated_at
) VALUES (
    1,
    20,
    5,
    'pendente',
    TRUE,
    NOW(),
    NOW()
);
