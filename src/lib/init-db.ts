import db from "./db-pg.js";

/**
 * Creates all PostgreSQL tables if they don't exist yet.
 * Tables are created in dependency order to respect foreign key constraints.
 */
export async function initDatabase(): Promise<void> {
    try {
        console.log("🔄 A verificar/criar tabelas na base de dados...");

        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_utilizadores (
                id VARCHAR(255) PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                numero_identidade VARCHAR(100),
                data_nascimento VARCHAR(50),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                telefone VARCHAR(50),
                pais VARCHAR(100),
                localidade VARCHAR(255),
                role VARCHAR(50) DEFAULT 'CLIENTE',
                enebled BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_categoria (
                id VARCHAR(255) PRIMARY KEY,
                designacao VARCHAR(255) NOT NULL,
                icone VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_empresa (
                id VARCHAR(255) PRIMARY KEY,
                designacao VARCHAR(255) NOT NULL,
                descricao TEXT,
                localizacao VARCHAR(255),
                nif VARCHAR(50),
                icone VARCHAR(255),
                id_utilizador VARCHAR(255) REFERENCES tbl_utilizadores(id) ON DELETE SET NULL,
                enabled BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_prestadores (
                id VARCHAR(255) PRIMARY KEY,
                taxa_urgencia NUMERIC(10,2) DEFAULT 0,
                percentagem_desconto NUMERIC(5,2) DEFAULT 0,
                minimo_desconto NUMERIC(10,2) DEFAULT 0,
                nif VARCHAR(50),
                profissao VARCHAR(255),
                id_utilizador VARCHAR(255) REFERENCES tbl_utilizadores(id) ON DELETE SET NULL,
                enable BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_servicos (
                id VARCHAR(255) PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                descricao TEXT,
                categoria VARCHAR(255) REFERENCES tbl_categoria(id) ON DELETE SET NULL,
                enabled BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_orcamento (
                id VARCHAR(255) PRIMARY KEY,
                total NUMERIC(10,2) DEFAULT 0,
                id_utilizadores VARCHAR(255) REFERENCES tbl_utilizadores(id) ON DELETE SET NULL,
                enabled BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Sequência + tabela separados para permitir INSERT com null no id
        // (o código existente passa null como $1 — SERIAL rejeitaria NOT NULL)
        await db.query(`
            CREATE SEQUENCE IF NOT EXISTS tbl_prestacao_servico_id_seq;
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_prestacao_servico (
                id INTEGER PRIMARY KEY DEFAULT nextval('tbl_prestacao_servico_id_seq'),
                designacao VARCHAR(255),
                subtotal NUMERIC(10,2) DEFAULT 0,
                horas_estimadas NUMERIC(10,2) DEFAULT 0,
                id_prestador VARCHAR(255) REFERENCES tbl_prestadores(id) ON DELETE SET NULL,
                id_utilizador VARCHAR(255) REFERENCES tbl_utilizadores(id) ON DELETE SET NULL,
                id_servico VARCHAR(255) REFERENCES tbl_servicos(id) ON DELETE SET NULL,
                preco_hora NUMERIC(10,2) DEFAULT 0,
                estado VARCHAR(50) DEFAULT 'PENDENTE',
                id_orcamento VARCHAR(255) REFERENCES tbl_orcamento(id) ON DELETE SET NULL,
                id_empresa VARCHAR(255) REFERENCES tbl_empresa(id) ON DELETE SET NULL,
                tipo_prestador VARCHAR(50) DEFAULT 'particular',
                urgente BOOLEAN DEFAULT false,
                enabled BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.query(`
            ALTER SEQUENCE tbl_prestacao_servico_id_seq OWNED BY tbl_prestacao_servico.id;
        `);

        // Trigger para converter null → nextval (o INSERT existente passa null como id)
        await db.query(`
            CREATE OR REPLACE FUNCTION tbl_prestacao_servico_auto_id()
            RETURNS TRIGGER AS $$
            BEGIN
                IF NEW.id IS NULL THEN
                    NEW.id := nextval('tbl_prestacao_servico_id_seq');
                END IF;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await db.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_prestacao_servico_auto_id'
                ) THEN
                    CREATE TRIGGER trg_prestacao_servico_auto_id
                    BEFORE INSERT ON tbl_prestacao_servico
                    FOR EACH ROW
                    EXECUTE FUNCTION tbl_prestacao_servico_auto_id();
                END IF;
            END;
            $$;
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS tbl_proposta (
                id VARCHAR(255) PRIMARY KEY,
                id_prestacao_servico INTEGER REFERENCES tbl_prestacao_servico(id) ON DELETE SET NULL,
                id_prestador VARCHAR(255) REFERENCES tbl_prestadores(id) ON DELETE SET NULL,
                preco_hora NUMERIC(10,2) DEFAULT 0,
                horas_estimadas NUMERIC(10,2) DEFAULT 0,
                estado VARCHAR(50) DEFAULT 'PENDENTE',
                enabled BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("✅ Todas as tabelas foram verificadas/criadas com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao criar tabelas:", error);
        throw error;
    }
}
