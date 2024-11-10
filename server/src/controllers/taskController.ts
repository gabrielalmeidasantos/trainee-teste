import { Request, Response } from 'express';
import { z } from 'zod';
import { Task, TaskCRUD } from '../models/taskModel';
import initBd from '../database/database';
import logger from '../logger';

const taskSchema = z.object({
  name: z.string().max(128, 'O nome deve ter no máximo 128 caracteres'),
  description: z
    .string()
    .max(255, 'A descrição deve ter no máximo 255 caracteres'),
  status: z.enum(['pending', 'in_progress', 'done']),
});

const idSchema = z.string().uuid('ID inválido');

export async function createTask(req: Request, res: Response): Promise<void> {
  try {
    const { name, description, status }: Task = taskSchema.parse(req.body);
    const task = await TaskCRUD.createTask(await initBd(), {
      name,
      description,
      status,
    });
    res.status(201).json(task);
  } catch (error) {
    logger.error(error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      console.log(error);

      res.status(500).json({ error: 'Erro ao criar a tarefa' });
    }
  }
}
export async function getTaskById(req: Request, res: Response): Promise<void> {
  try {
    const id: string = idSchema.parse(req.params.id);
    const task: Task = await TaskCRUD.getTaskById(await initBd(), id);

    res.status(200).json(task);
  } catch (error) {
    logger.error(error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Erro ao listar a tarefa' });
    }
  }
}
export async function updateTask(req: Request, res: Response): Promise<void> {
  try {
    const { name, description, status }: Task = taskSchema.parse(req.body);
    const id: string = idSchema.parse(req.params.id);

    const updated: boolean = await TaskCRUD.updateTask(await initBd(), {
      id: id,
      name,
      description,
      status,
    });

    if (updated) {
      res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    logger.error(error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
    }
  }
}
export async function deleteTask(req: Request, res: Response): Promise<void> {
  try {
    const id: string = idSchema.parse(req.params.id);

    const deleted: boolean = await TaskCRUD.deleteTask(await initBd(), id);
    if (deleted) {
      res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    logger.error(error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Erro ao apagar a tarefa' });
    }
  }
}
export async function listTasks(req: Request, res: Response): Promise<void> {
  const status: string | undefined = req.query.status as
    | 'pending'
    | 'in_progress'
    | 'done'
    | undefined;

  try {
    const tasks: Task[] = await TaskCRUD.listTasks(await initBd(), status);
    res.status(200).json(tasks);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Erro ao listar as tarefas' });
  }
}
