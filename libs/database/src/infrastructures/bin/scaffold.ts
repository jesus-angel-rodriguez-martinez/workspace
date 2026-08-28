#!/usr/bin/env -S tsx
import { ScaffolderService } from '@infrastructures/scaffolder';
import { LoggerService } from '@libs/logger';

LoggerService.init({
  applicationName: '@libs/database',
  level: 'info',
  prettify: true
});
const loggerService = new LoggerService({ loggerName: import.meta.url });

const [name] = process.argv.slice(2);

const scaffolderService = new ScaffolderService();
const migration = await scaffolderService.create(name);

loggerService.info(`Migration created successfully [migration="${migration}"]`);
