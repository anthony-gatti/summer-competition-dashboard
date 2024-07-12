import http from 'http';
import express from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_USER, SERVER, SERVER_HOSTNAME, SERVER_PORT } from './config/config';
import MainController from './controllers/main';
import { defineRoutes } from './modules/routes';
import PersonController from './controllers/person';
import TaskController from './controllers/task';
import CompletionController from './controllers/completion';
import TeamController from './controllers/team';


export const application = express();
export let httpServer: ReturnType<typeof http.createServer>
export let db: ReturnType<typeof drizzle>;

export const Main = async () => {
    console.info('------------------------------------------');
    console.info('Initializing API');
    console.info('------------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    console.info('------------------------------------------');
    console.info('Connect to Postgres');
    console.info('------------------------------------------');
    try {
        const client = new Client({
            host: "127.0.0.1",
            port: 5432,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
            database: POSTGRES_DATABASE,
          });

          console.log(client);

          await client.connect();
          db = drizzle(client);
          
          console.info("Successfully connected to database.");
    } catch (error) {
        console.info('------------------------------------------');
        console.log('Unable to connect to Postgres:');
        console.error(error);
        console.info('------------------------------------------');
    }

    console.info('------------------------------------------');
    console.info('Logging & Configuration');
    console.info('------------------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);

    console.info('------------------------------------------');
    console.info('Define Controller Routing');
    console.info('------------------------------------------');
    defineRoutes([MainController, PersonController, TaskController, CompletionController, TeamController], application);

    console.info('------------------------------------------');
    console.info('Define Controller Routing');
    console.info('------------------------------------------');
    application.use(routeNotFound);

    console.info('------------------------------------------');
    console.info('Start Server');
    console.info('------------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        console.info('------------------------------------------');
        console.info('Server Started: ' + SERVER_HOSTNAME + ':' + SERVER_PORT);
        console.info('------------------------------------------');
    });
}

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();