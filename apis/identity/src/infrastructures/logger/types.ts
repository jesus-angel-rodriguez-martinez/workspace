import {
  type AbstractLoggerService,
  type ILoggerServiceConfiguration,
  type ILoggerServiceInitConfiguration
} from '@libs/logger';

export type ComposeLogger = (
  configuration: ILoggerServiceConfiguration & ILoggerServiceInitConfiguration
) => AbstractLoggerService;
