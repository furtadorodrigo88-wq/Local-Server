import db from "../lib/db-pg.js";
import type { ServiceDBType, ServicoDetalhadoType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const ServiceModel = {
  async create(newService: ServiceDBType): Promise<ServiceDBType | null> {
    try {
      const query = `INSERT INTO tbl_servicos (id, nome, descricao, categoria, enabled, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = [
        generateUUID(),
        newService.nome,
        newService.descricao,
        newService.categoria,
        newService.enabled ?? true,
        new Date(),
        new Date(),
      ];
      const result = await db.query<ServiceDBType>(query, values);
      if (result.rows.length === 0 || !result?.rows[0] || !result) return null;
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getAll(): Promise<ServiceDBType[] | null> {
    try {
      const result = await db.query<ServiceDBType>(`SELECT * FROM tbl_servicos`);
      return result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async get(id: string): Promise<ServiceDBType | null> {
    try {
      const query = `SELECT * FROM tbl_servicos WHERE id = $1`;
      const values = [id];
      const result = await db.query<ServiceDBType>(query, values);
      if (result.rows.length === 0 || !result?.rows[0] || !result) return null;
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async update(
    id: string,
    servicoAtualizado: ServiceDBType,
  ): Promise<ServiceDBType | null> {
    try {
      const query = `UPDATE tbl_servicos
        SET nome=$1, descricao=$2, categoria=$3, enabled=$4, updated_at=$5
        WHERE id=$6
        RETURNING *`;
      const values = [
        servicoAtualizado.nome,
        servicoAtualizado.descricao,
        servicoAtualizado.categoria,
        servicoAtualizado.enabled,
        new Date(),
        id,
      ];
      const result = await db.query<ServiceDBType>(query, values);
      if (result.rows.length === 0 || !result?.rows[0] || !result) return null;
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async delete(id: string): Promise<ServiceDBType | null> {
    try {
      const query = `DELETE FROM tbl_servicos WHERE id = $1 RETURNING *`;
      const values = [id];
      const result = await db.query<ServiceDBType>(query, values);
      if (result.rows.length === 0 || !result?.rows[0] || !result) return null;
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getAllServicoDetalhado(
    limit: number,
    offset: number,
  ): Promise<ServicoDetalhadoType[] | null> {
    try {
      const query = `
        SELECT DISTINCT
            s.id as id_servico,
            s.nome as servico_nome,
            s.descricao as servico_descricao,
            c.designacao as designacao_categoria,
            c.icone as icone_categoria,
            e.id as id_empresa,
            e.designacao as designacao_empresa,
            e.icone as icone_empresa,
            s.enabled
        FROM tbl_servicos s
        INNER JOIN tbl_categoria c ON c.id = s.categoria
        INNER JOIN tbl_prestacao_servico ps ON s.id = ps.id_servico
        INNER JOIN tbl_empresa e ON e.id = ps.id_empresa
        WHERE s.enabled = true
        LIMIT $1 OFFSET $2
        `;
      const values = [limit, offset];
      const result = await db.query<ServicoDetalhadoType>(query, values);
      return result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
