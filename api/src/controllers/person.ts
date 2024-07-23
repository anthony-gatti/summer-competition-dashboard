import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { task } from '../models/task';
import { person } from '../models/person';
import { completion } from '../models/completion';
import { db } from '../server';
import { count, and, sum } from 'drizzle-orm';
import { eq, lt, gte } from 'drizzle-orm/expressions';

@Controller('/person')
class PersonController {
    @Route('get', '/')
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const persons = await db.select().from(person);
            return res.status(200).json(persons);
        } catch (error) {
            console.error('Error fetching persons:', error);
            return res.status(500).json({ error: 'Failed to fetch persons' });
        }
    }

    @Route('get', '/:name')
    async getPersonByName(req: Request, res: Response, next: NextFunction) {
        try {
            const personRow = await db
                .select({ person_id: person.person_id, name: person.name })
                .from(person)
                .where(eq(person.name, req.query.name as string))
                .limit(1)
                .execute();

            if (!personRow) {
                throw new Error(`Person with name ${req.body.name} not found.`);
            }
            return res.status(200).json(personRow[0]);
        } catch (error) {
            console.error('Error fetching person:', error);
            return res.status(500).json({ error: 'Failed to fetch person' });
        }
    }

    @Route('get', '/:name/points')
    async getPersonPoints(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await db
                .select({
                total_points: sum(task.points),
                })
                .from(completion)
                .leftJoin(person, eq(completion.person_id, person.person_id))
                .leftJoin(task, eq(completion.task_id, task.task_id))
                .where(eq(person.person_id, Number(req.query.person_id)))
                .execute()

            return res.status(200).json(result[0]);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return res.status(500).json({ error: 'Failed to fetch tasks' });
        }
    }

    @Route('post', '/')
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, team_number } = req.body;
            const newPerson = await db.insert(person).values({ name: name, team: team_number });
            return res.status(201).json(newPerson);
        } catch (error) {
            console.error('Error creating person:', error);
            return res.status(500).json({ error: 'Failed to create person' });
        }
    }
}

export default PersonController;