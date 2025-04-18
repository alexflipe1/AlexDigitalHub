import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";
import { sql } from 'drizzle-orm';
import path from 'path';
import fs from 'fs';

// Cria o diretório data se não existir
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Caminho para o arquivo do banco de dados SQLite
const dbPath = path.join(dataDir, 'database.sqlite');

// Cria a conexão com o SQLite
const sqlite = new Database(dbPath);

// Configura a instância do Drizzle ORM
export const db = drizzle(sqlite, { schema });

// Executa as migrações iniciais para criar as tabelas se não existirem
function setupDatabase() {
  // Cria a tabela de usuários se não existir
  db.run(sql`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  // Cria a tabela de botões personalizados se não existir
  db.run(sql`
    CREATE TABLE IF NOT EXISTS custom_buttons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      page_type TEXT NOT NULL,
      icon TEXT NOT NULL,
      icon_bg_color TEXT NOT NULL,
      url TEXT NOT NULL,
      open_type TEXT NOT NULL DEFAULT 'iframe',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Inicializa o banco de dados
setupDatabase();