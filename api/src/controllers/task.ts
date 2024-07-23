import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { task } from '../models/task';
import { person } from '../models/person';
import { completion } from '../models/completion';
import { db } from '../server';
import { count, and } from 'drizzle-orm';
import { eq, lt, gte, like } from 'drizzle-orm/expressions';

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

    @Route('get', '/:task_name')
    async getTaskByName(req: Request, res: Response, next: NextFunction) {
        try {
            const taskRow = await db
                .select({ task_id: task.task_id, task_name: task.task_name })
                .from(task)
                .where(eq(task.task_name, req.query.name as string))
                .limit(1)
                .execute();

            if (!taskRow) {
                throw new Error(`Task with name ${req.body.name} not found.`);
            }
            return res.status(200).json(taskRow[0]);
        } catch (error) {
            console.error('Error fetching task:', error);
            return res.status(500).json({ error: 'Failed to fetch task' });
        }
    }

    @Route('get', '/person/:id')
    async getPersonTasks(req: Request, res: Response, next: NextFunction) {
        if (req.query.status === 'available') {
            try {
                // Get the tasks where the number of completions is less than the number of repetitions allowed
                const tasks = await db
                    .select({
                        task_id: task.task_id,
                        task_name: task.task_name,
                        description: task.description,
                        points: task.points,
                        restrictions: task.restrictions,
                        repititions: task.repititions,
                        team: task.team,
                        completion_count: count(completion.completion_id)
                    })
                    .from(task)
                    .leftJoin(completion, and(eq(task.task_id, completion.task_id), eq(completion.person_id, Number(req.query.person_id))))
                    .groupBy(task.task_id)
                    .where(eq(task.team, false))
                    .having(lt(count(completion.completion_id), task.repititions))
                    .execute();
                return res.status(200).json(tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                return res.status(500).json({ error: 'Failed to fetch tasks' });
            }
        } else {
            try {
                // Get the tasks where the number of completions is less than the number of repetitions allowed
                const tasks = await db
                    .select({
                        task_id: task.task_id,
                        task_name: task.task_name,
                        description: task.description,
                        points: task.points,
                        restrictions: task.restrictions,
                        repititions: task.repititions,
                        team: task.team,
                        completion_count: count(completion.completion_id)
                    })
                    .from(task)
                    .leftJoin(completion, and(eq(task.task_id, completion.task_id), eq(completion.person_id, Number(req.query.person_id))))
                    .groupBy(task.task_id)
                    .where(eq(task.team, false))
                    .having(gte(count(completion.completion_id), task.repititions))
                    .execute();
                return res.status(200).json(tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                return res.status(500).json({ error: 'Failed to fetch tasks' });
            }
        }
    }

    @Route('get', '/team/:id')
    async getTeamTasks(req: Request, res: Response, next: NextFunction) {
        if (req.query.status === 'available') {
            try {
                // Get the tasks where the number of completions is less than the number of repetitions allowed
                const tasks = await db
                    .select({
                        task_id: task.task_id,
                        task_name: task.task_name,
                        description: task.description,
                        points: task.points,
                        restrictions: task.restrictions,
                        repititions: task.repititions,
                        team: task.team,
                        completion_count: count(completion.completion_id)
                    })
                    .from(task)
                    .leftJoin(completion, and(eq(task.task_id, completion.task_id), eq(completion.person_id, Number(req.query.person_id))))
                    .groupBy(task.task_id)
                    .where(eq(task.team, true))
                    .having(lt(count(completion.completion_id), task.repititions))
                    .execute();
                return res.status(200).json(tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                return res.status(500).json({ error: 'Failed to fetch tasks' });
            }
        } else {
            try {
                // Get the tasks where the number of completions is less than the number of repetitions allowed
                const tasks = await db
                    .select({
                        task_id: task.task_id,
                        task_name: task.task_name,
                        description: task.description,
                        points: task.points,
                        restrictions: task.restrictions,
                        repititions: task.repititions,
                        team: task.team,
                        completion_count: count(completion.completion_id)
                    })
                    .from(task)
                    .leftJoin(completion, and(eq(task.task_id, completion.task_id), eq(completion.person_id, Number(req.query.person_id))))
                    .groupBy(task.task_id)
                    .where(eq(task.team, true))
                    .having(gte(count(completion.completion_id), task.repititions))
                    .execute();
                return res.status(200).json(tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                return res.status(500).json({ error: 'Failed to fetch tasks' });
            }
        }
    }

    @Route('post', '/')
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { task_name, description, points, restrictions, repititions, team } = req.body;
            const newTask = await db.insert(task).values({
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
