import { getDBConnection } from './DatabaseConnection';

export const createTables = async () => {
  const db = await getDBConnection();

  // Cria tabela de usuários (admins)
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    );
  `);

  // Cria tabela de profissionais
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS profissionais (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      especialidade TEXT
    );
  `);

  // **Cria tabela de serviços** ← adicione isto
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS servicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL
    );
  `);

  // Cria tabela de agendamentos
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profissional_id INTEGER,
    servico_id INTEGER,
    data TEXT,
    hora TEXT,
    cliente_nome TEXT,
    FOREIGN KEY (profissional_id) REFERENCES profissionais(id),
    FOREIGN KEY (servico_id) REFERENCES servicos(id)
    );
  `);

  console.log('Tabelas criadas com sucesso');
};
