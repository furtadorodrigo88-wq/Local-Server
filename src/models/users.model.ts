import db from "../lib/db-pg.js";
import { formatDateDDMMYYYY } from "../utils/date.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateUUID } from "../utils/uuid.js";
import type {
  UserDBType,
  userType,
  PasswordRequestType,
} from "../utils/types.js";

export const UsersModel = {
  async create(user: userType): Promise<UserDBType | null> {
    try {
      const query = `
        INSERT INTO tbl_utilizadores
        (id, nome, numero_identidade, data_nascimento, email, password, telefone, pais, localidade, role, enebled, created_at, update_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *`;

      const values = [
        generateUUID(),
        user.nome,
        user.numero_identidade,
        formatDateDDMMYYYY(user.data_nascimento),
        user.email,
        await hashPassword(user.password),
        user.telefone,
        user.pais,
        user.localidade,
        user.role || "CLIENTE",
        user.enebled ?? true,
        new Date(),
        new Date(),
      ];

      const result = await db.query<UserDBType>(query, values);
      if (result.rows.length === 0 || !result?.rows[0] || !result) return null;
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getAll(): Promise<UserDBType[] | null> {
    try {
        const result = await db.query<UserDBType>(`SELECT * FROM tbl_utilizadores`);
        return result.rows.length > 0 ? result.rows : null;
    } catch (error) {
        console.log(error);
        return null;
    }
},

  async get(id: string): Promise<UserDBType | null> {
    try {
      const result = await db.query<UserDBType>(
        `SELECT * FROM tbl_utilizadores WHERE id = $1`,
        [id],
      );
      if (result.rows.length === 0 || !result?.rows[0] || !result) return null;
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getByEmail(email: string): Promise<UserDBType | null> {
    try {
      const result = await db.query<UserDBType>(
        `SELECT * FROM tbl_utilizadores WHERE email = $1`,
        [email],
      );
      if (result.rows.length === 0 || !result?.rows[0] || !result) return null;
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async update(id: string, updatedUser: userType): Promise<UserDBType | null> {
    try {
      const query = `
        UPDATE tbl_utilizadores
        SET
            nome = $1,
            numero_identidade = $2,
            data_nascimento = $3,
            email = $4,
            password = $5,
            telefone = $6,
            pais = $7,
            localidade = $8,
            role = $9,
            enebled = $10,
            update_at = $11
        WHERE id = $12
        RETURNING *
        `;
      const values = [
        updatedUser.nome,
        updatedUser.numero_identidade,
        formatDateDDMMYYYY(updatedUser.data_nascimento),
        updatedUser.email,
        await hashPassword(updatedUser.password),
        updatedUser.telefone,
        updatedUser.pais,
        updatedUser.localidade,
        updatedUser.role || "CLIENTE",
        updatedUser.enebled ?? true,
        new Date(),
        id,
      ];

      const result = await db.query<UserDBType>(query, values);
      if (result.rows.length === 0 || !result?.rows[0] || !result) return null;
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async updatePassword(
    id: string,
    newPassword: string,
  ): Promise<UserDBType | null> {
    try {
      const query = `
        UPDATE tbl_utilizadores
        SET password = $1, update_at = $2
        WHERE id = $3
        RETURNING *
        `;
      const hashedPassword = await hashPassword(newPassword);
      const values = [hashedPassword, new Date(), id];

      const result = await db.query<UserDBType>(query, values);
      if (result.rows.length === 0 || !result?.rows[0] || !result) return null;
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async resetPassword(
    id: string,
    passwordRequest: PasswordRequestType,
  ): Promise<UserDBType | null> {
    try {
      const user = await this.get(id);
      if (!user) throw new Error("Utilizador nao encontrado");

      const isMatch = await comparePassword(
        passwordRequest.oldPassword,
        user.password,
      );
      if (!isMatch) throw new Error("A senha antiga esta incorreta");

      if (passwordRequest.newPassword !== passwordRequest.passwordConfirmed) {
        throw new Error("As senhas nao coincidem");
      }

      return await this.updatePassword(id, passwordRequest.newPassword);
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  async delete(id: string): Promise<UserDBType | null> {
    try {
      const query = `DELETE FROM tbl_utilizadores WHERE id = $1 RETURNING *`;
      const values = [id];
      const result = await db.query<UserDBType>(query, values);
      if (result.rows.length === 0 || !result?.rows[0] || !result) return null;
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
