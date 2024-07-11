import {
    pgTable,
    serial,
    varchar,
    integer
  } from 'drizzle-orm/pg-core';
  import { person } from './person';
  import { task } from './task';
  
  export const completion = pgTable('completion', {
    completion_id: serial('completion_id').primaryKey(),
    person_id: integer("person_id").references(() => person.person_id),
    task_id: integer("task_id").references(() => task.task_id),
    comment: varchar('comment', { length: 256 }).notNull(),
    link: varchar('link', { length: 256 }).notNull(),
  });
