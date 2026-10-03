import { type AbstractLoggerService, type ILoggerServiceInitConfiguration } from '@libs/logger';

export type ComposeLogger = (configuration: ILoggerServiceInitConfiguration) => AbstractLoggerService;
