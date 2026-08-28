#!/usr/bin/env -S tsx
import 'dotenv/config';
import { ClientService } from '@infrastructures/client';
import { MigratorService } from '@infrastructures/migrator';
import { ConfigurationService } from '@libs/configuration';
import { LoggerService } from '@libs/logger';

const { DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } = new ConfigurationService(
  {
    DATABASE: 'string',
    DATABASE_HOST: 'string',
    DATABASE_PASSWORD: 'string',
    DATABASE_PORT: 'number',
    DATABASE_USER: 'string'
  }
).getAll();

LoggerService.init({
  applicationName: '@libs/database',
  level: 'info',
  prettify: true
});
const loggerService = new LoggerService({ loggerName: import.meta.url });

const clientService = new ClientService({
  database: DATABASE,
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  user: DATABASE_USER
});

const migratorService = new MigratorService({ clientService, loggerService });
const [command] = process.argv.slice(2);

if (command === 'down') {
  await migratorService.down();
} else if (command === 'reset') {
  await migratorService.reset();
} else {
  await migratorService.up();
}
