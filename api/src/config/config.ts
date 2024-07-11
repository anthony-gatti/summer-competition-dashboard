import dotenv from 'dotenv'

dotenv.config()

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';

export const POSTGRES_USER = process.env.POSTGRES_USER || '';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
export const POSTGRES_URL = process.env.POSTGRES_URL || '';
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || '';

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
export const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 12345;

export const SERVER = {
    SERVER_HOSTNAME,
    SERVER_PORT
};