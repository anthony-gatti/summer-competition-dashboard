import {
    pgTable,
    serial,
    varchar,
    integer,
    boolean
  } from 'drizzle-orm/pg-core';
  
  export const task = pgTable('task', {
    task_id: serial('task_id').primaryKey(),
    task_name: varchar('task_name', { length: 256 }).notNull(),
    description: varchar('description', { length: 256 }).notNull(),
    points: integer('points').notNull(),
    restrictions: varchar('restrictions', { length: 256 }).notNull(),
    repititions: integer('repititions').notNull(),
    team: boolean('team').notNull()
  });
