# Desafio Final: O Marketplace de Serviços (Lista Completa)

## 1. Gestão de Credenciais (Segurança)

- Update Password: Rota protegida (authGuard). Exige validação cruzada da password antiga com bcrypt.compare() antes de gerar o novo hash e gravar na base de dados.

- Reset Password: Rota com a responsabilidade de redefinir o acesso de forma segura, atualizando os dados de autenticação do utilizador.

## 2. O Motor Lógico (Cálculo de Orçamento)

- Calcular Total (PUT /orcamento/:id/calcular):
  - O endpoint deve ir à base de dados
  - consolidar os valores da tbl_prestacao_servico
  - cruzando preco_hora com horas_estimadas
  - aplicar as regras de negócio de taxa_urgencia ou descontos da tbl_prestadores
  - gravar o valor absoluto na coluna total da tbl_orcamento.

## 3. Fluxo de Negociação (Aceitação de Propostas)

- Aceitar Proposta (PUT /propostas/:id/aceitar):
  - O dono do orçamento altera o estado da proposta para "Aceite".
  - O sistema deve atuar em cascata:
    - atualizar o estado da tbl_prestacao_servico correspondente
    - garantir que as propostas concorrentes para o mesmo serviço ficam marcadas como "Rejeitadas".

# 4. Garantia de Qualidade e Manutenção (QA & Maintenance)

- Testes de Stress:
  - A equipa é responsável por tentar quebrar a sua própria API.
  - Devem testar e validar não apenas o "caminho feliz", mas forçar cenários de erro
    ex: - enviar payloads incompletos, - injetar IDs que não existem no MySQL - aceder com um Token JWT manipulado/expirado.

- Padronização e Refatorização:
  - Garantir que 100% das rotas respondem com o mesmo formato de contrato estruturado (como mostraste no teu código: status, message, e data).
  - O código dos Controllers deve ser limpo e não ter repetições desnecessárias.

- Sincronia Total (Código vs. Swagger):
  - Manutenção rigorosa da documentação.
  - Se uma rota ganha um novo parâmetro ou passa a devolver um erro 403, o ficheiro .yaml respetivo tem de ser atualizado no mesmo instante.
  - A regra é:
    - se não está no Swagger, a rota não existe.
