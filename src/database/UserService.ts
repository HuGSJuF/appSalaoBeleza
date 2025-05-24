import { getDBConnection } from './DatabaseConnection';

export interface User {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

// ✅ Função para adicionar um usuário (Admin)
export const addUser = async (user: User) => {
  const db = await getDBConnection();
  const insertQuery = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES (?, ?, ?);
  `;
  await db.executeSql(insertQuery, [user.nome, user.email, user.senha]);
};

// ✅ Função para verificar login
export const loginUser = async (email: string, senha: string) => {
  const db = await getDBConnection();
  const selectQuery = `
    SELECT * FROM usuarios WHERE email = ? AND senha = ?;
  `;
  const results = await db.executeSql(selectQuery, [email, senha]);
  const rows = results[0].rows;

  if (rows.length > 0) {
    const user = rows.item(0);
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  } else {
    return null;
  }
};
