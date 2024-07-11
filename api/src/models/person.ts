import {
    pgTable,
    serial,
    varchar,
    integer
  } from 'drizzle-orm/pg-core';
  
  export const person = pgTable('person', {
    person_id: serial('person_id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    team: integer('team_number').notNull(),
  });
