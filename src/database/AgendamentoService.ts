import { getDBConnection } from './DatabaseConnection';

export interface Agendamento {
  id?: number;
  profissional_id: number;
  servico_id: number;
  data: string;
  hora: string;
  cliente_nome: string;
  // Campos adicionais vindos do JOIN:
  profissional_nome?: string;
  servico_nome?: string;
}

// ✅ Inserir agendamento (com serviço)
export const addAgendamento = async (agendamento: Agendamento) => {
  const db = await getDBConnection();
  const insertQuery = `
    INSERT INTO agendamentos 
      (profissional_id, servico_id, data, hora, cliente_nome)
    VALUES (?, ?, ?, ?, ?);
  `;
  await db.executeSql(insertQuery, [
    agendamento.profissional_id,
    agendamento.servico_id,
    agendamento.data,
    agendamento.hora,
    agendamento.cliente_nome,
  ]);
};

// ✅ Listar agendamentos (já trazendo nome do profissional e do serviço)
export const getAgendamentos = async (): Promise<Agendamento[]> => {
  const db = await getDBConnection();
  const selectQuery = `
    SELECT 
      a.id,
      a.profissional_id,
      p.nome   AS profissional_nome,
      a.servico_id,
      s.nome   AS servico_nome,
      a.cliente_nome,
      a.data,
      a.hora
    FROM agendamentos a
    LEFT JOIN profissionais p ON a.profissional_id = p.id
    LEFT JOIN servicos     s ON a.servico_id       = s.id
    ORDER BY a.data, a.hora;
  `;

  const results = await db.executeSql(selectQuery);
  const rows = results[0].rows;
  const agendamentos: Agendamento[] = [];

  for (let i = 0; i < rows.length; i++) {
    agendamentos.push(rows.item(i));
  }

  return agendamentos;
};
