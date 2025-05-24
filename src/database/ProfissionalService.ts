import { getDBConnection } from './DatabaseConnection';

export interface Profissional {
  id?: number;
  nome: string;
  telefone: string;
  especialidade: string;
}

// ✅ Inserir profissional
export const addProfissional = async (profissional: Profissional) => {
  const db = await getDBConnection();
  const insertQuery = `
    INSERT INTO profissionais (nome, telefone, especialidade)
    VALUES (?, ?, ?);
  `;
  await db.executeSql(insertQuery, [
    profissional.nome,
    profissional.telefone,
    profissional.especialidade,
  ]);
};

// ✅ Listar profissionais
export const getProfissionais = async (): Promise<Profissional[]> => {
  const db = await getDBConnection();
  const selectQuery = `SELECT * FROM profissionais;`;
  const results = await db.executeSql(selectQuery);
  const rows = results[0].rows;
  const profissionais: Profissional[] = [];

  for (let i = 0; i < rows.length; i++) {
    profissionais.push(rows.item(i));
  }

  return profissionais;
};
