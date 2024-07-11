import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { person } from '../models/person';
import { db } from '../server';

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