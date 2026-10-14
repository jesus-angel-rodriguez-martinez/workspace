#!/usr/bin/env -S tsx
import 'dotenv/config';
import { ClientService } from '@infrastructures/client';
import { MigratorService } from '@infrastructures/migrator';
import { PathService } from '@infrastructures/path';
import { ConfigurationService } from '@libs/configuration';
import { LoggerService } from '@libs/logger';

const { DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } = new ConfigurationService(
  {
    DATABASE: { required: true, type: 'string' },
    DATABASE_HOST: { required: true, type: 'string' },
    DATABASE_PASSWORD: { required: true, type: 'string' },
    DATABASE_PORT: { required: true, type: 'number' },
    DATABASE_USER: { required: true, type: 'string' }
  }
).getAll();

LoggerService.init({
  level: 'info',
  name: '@libs/database',
  prettify: true
});
const loggerService = new LoggerService();

const clientService = new ClientService({
  database: DATABASE,
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  user: DATABASE_USER
});

const pathService = new PathService();
const migratorService = new MigratorService({ clientService, loggerService, pathService });

const [command] = process.argv.slice(2);
if (command === 'down') {
  await migratorService.down();
} else if (command === 'reset') {
  await migratorService.reset();
} else {
  await migratorService.up();
}
