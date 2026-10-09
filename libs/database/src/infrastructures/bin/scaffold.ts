#!/usr/bin/env -S tsx
import { PathService } from '@infrastructures/path';
import { ScaffolderService } from '@infrastructures/scaffolder';
import { LoggerService } from '@libs/logger';

LoggerService.init({
  level: 'info',
  name: '@libs/database',
  prettify: true
});
const loggerService = new LoggerService();

const [name] = process.argv.slice(2);

const pathService = new PathService();
const scaffolderService = new ScaffolderService({ pathService });

const migration = await scaffolderService.create(name);
loggerService.info(`Migration created successfully [migration="${migration}"]`);
