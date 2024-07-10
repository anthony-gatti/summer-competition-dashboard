import http from 'http';
import express from 'express';
import 'reflect-metadata';

import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { SERVER, SERVER_HOSTNAME, SERVER_PORT } from './config/config';
import MainController from './controllers/main';
import { defineRoutes } from './modules/routes';


export const application = express();
export let httpServer: ReturnType<typeof http.createServer>

export const Main = () => {
    console.info('------------------------------------------');
    console.info('Initializing API');
    console.info('------------------------------------------');
    application.use(express.urlencoded({ extended: true }))
    application.use(express.json())

    console.info('------------------------------------------');
    console.info('Logging & Configuration');
    console.info('------------------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);

    console.info('------------------------------------------');
    console.info('Define Controller Routing');
    console.info('------------------------------------------');
    defineRoutes([MainController], application);

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