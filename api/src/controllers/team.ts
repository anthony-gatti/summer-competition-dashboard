import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { task } from '../models/task';
import { person } from '../models/person';
import { completion } from '../models/completion';
import { db } from '../server';
import { count, and, sum } from 'drizzle-orm';
import { eq, lt, gte } from 'drizzle-orm/expressions';

@Controller('/team')
class TeamController {
    @Route('get', '/')
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const team_num: number = +(req.query.number || 0);
            const result = await db
                .select({
                total_points: sum(task.points),
                })
                .from(completion)
                .leftJoin(person, eq(completion.person_id, person.person_id))
                .leftJoin(task, eq(completion.task_id, task.task_id))
                .where(eq(person.team, team_num))
                .execute()

            return res.status(200).json(result[0]);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return res.status(500).json({ error: 'Failed to fetch tasks' });
        }
    }

}

export default TeamController;
