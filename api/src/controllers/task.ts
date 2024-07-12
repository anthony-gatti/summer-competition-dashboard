import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { task } from '../models/task';
import { db } from '../server';

@Controller('/task')
class TaskController {
    @Route('get', '/')
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await db.select().from(task);
            return res.status(200).json(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return res.status(500).json({ error: 'Failed to fetch tasks' });
        }
    }

    @Route('post', '/')
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { task_name, description, points, restrictions, repititions, team } = req.body;
            const newTask = await db
                .insert(task)
                .values({
                    task_name: task_name,
                    description: description,
                    points: points,
                    restrictions: restrictions,
                    repititions: repititions,
                    team: team
                });
            return res.status(201).json(newTask);
        } catch (error) {
            console.error('Error creating task:', error);
            return res.status(500).json({ error: 'Failed to create task' });
        }
    }
}

export default TaskController;
