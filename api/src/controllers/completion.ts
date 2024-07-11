import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { completion } from '../models/completion';
import { db } from '../server';

@Controller('/completion')
class CompletionController {
    @Route('get', '/')
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const completions = await db.select().from(completion);
            return res.status(200).json(completions);
        } catch (error) {
            console.error('Error fetching completions:', error);
            return res.status(500).json({ error: 'Failed to fetch completions' });
        }
    }

    @Route('post', '/')
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { person_id, task_id, comment, link } = req.body;
            const newCompletion = await db.insert(completion).values({ person_id: person_id, task_id: task_id, comment: comment, link: link });
            return res.status(201).json(newCompletion);
        } catch (error) {
            console.error('Error creating completion:', error);
            return res.status(500).json({ error: 'Failed to create completion' });
        }
    }
}

export default CompletionController;