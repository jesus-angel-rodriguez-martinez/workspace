#!/usr/bin/env -S tsx
import { ScaffolderService } from '@infrastructures/scaffolder';
import { LoggerService } from '@libs/logger';

LoggerService.init({
  level: 'info',
  name: '@libs/database',
  prettify: true
});
const loggerService = new LoggerService();

const [name] = process.argv.slice(2);

const scaffolderService = new ScaffolderService();
const migration = await scaffolderService.create(name);

loggerService.info(`Migration created successfully [migration="${migration}"]`);
