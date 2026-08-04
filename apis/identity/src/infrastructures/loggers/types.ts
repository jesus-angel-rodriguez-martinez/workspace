import {
  type AbstractLoggerService,
  type ILoggerServiceConfiguration,
  type ILoggerServiceInitConfiguration
} from '@libs/logger';

export type ComposeLoggers = (
  configuration: ILoggerServiceConfiguration & ILoggerServiceInitConfiguration
) => AbstractLoggerService;
