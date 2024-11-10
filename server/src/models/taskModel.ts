import { Database } from 'sqlite';
import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id?: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'done';
}

export class TaskCRUD {
  static async createTask(db: Database, task: Task): Promise<Task> {
    const id: string = uuidv4();

    await db.run(
      `INSERT INTO tasks (id, name, description, status) VALUES (?, ?, ?, ?)`,
      [id, task.name, task.description, task.status],
    );

    return { id, ...task };
  }

  static async getTaskById(db: Database, id: string): Promise<Task> {
    const row = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
    return row;
  }

  static async updateTask(db: Database, task: Task): Promise<boolean> {
    const result = await db.run(
      `UPDATE tasks SET name = ?, description = ?, status = ? WHERE id = ? `,
      [task.name, task.description, task.status, task.id],
    );

    if (result.changes) {
      return result.changes > 0;
    }

    return false;
  }

  static async deleteTask(db: Database, id: string): Promise<boolean> {
    const result = await db.run(`DELETE from tasks WHERE id = ? `, [id]);
    if (result.changes) {
      return result.changes > 0;
    }

    return false;
  }

  static async listTasks(db: Database, status?: string): Promise<Task[]> {
    if (status) {
      return await db.all<Task[]>(
        `SELECT * FROM tasks WHERE status = ?`,
        status,
      );
    }

    return await db.all<Task[]>(`SELECT * FROM tasks`);
  }
}
