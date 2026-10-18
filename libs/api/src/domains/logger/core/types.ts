import { type AbstractLoggerService } from '@libs/logger';

export interface IApiLoggerServiceOptions {
  /**
   * Logging service used for structured output and diagnostics.
   */
  readonly loggerService: AbstractLoggerService;
}
