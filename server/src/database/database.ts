import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

async function initBd(): Promise<Database> {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL CHECK(length(name) <= 128),
      description TEXT NOT NULL CHECK(length(description) <= 255),
      status TEXT NOT NULL CHECK(status IN ('pending', 'in_progress', 'done'))
    )`);

  return db;
}

export default initBd;
