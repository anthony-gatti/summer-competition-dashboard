import {
    pgTable,
    serial,
    varchar,
    integer
  } from 'drizzle-orm/pg-core';
  
  export const task = pgTable('task', {
    task_id: serial('task_id').primaryKey(),
    task_name: varchar('task_name', { length: 256 }).notNull(),
    points: integer('points').notNull(),
    repititions: integer('repititions').notNull(),
  });
