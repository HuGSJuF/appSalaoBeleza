import { getDBConnection } from './DatabaseConnection';

export interface Servico {
  id?: number;
  nome: string;
  preco: number;
}

// ✅ Inserir serviço
export const addServico = async (servico: Servico) => {
  const db = await getDBConnection();
  const insertQuery = `
    INSERT INTO servicos (nome, preco)
    VALUES (?, ?);
  `;
  await db.executeSql(insertQuery, [servico.nome, servico.preco]);
};

// ✅ Listar serviços
export const getServicos = async (): Promise<Servico[]> => {
  const db = await getDBConnection();
  const selectQuery = `SELECT * FROM servicos;`;
  const results = await db.executeSql(selectQuery);
  const rows = results[0].rows;
  const servicos: Servico[] = [];

  for (let i = 0; i < rows.length; i++) {
    servicos.push(rows.item(i));
  }

  return servicos;
};
