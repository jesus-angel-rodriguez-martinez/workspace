import { type AbstractLoggerService } from '@libs/logger';

/**
 * Defines the dependencies required to create the API logger service.
 */
export interface IApiLoggerServiceOptions {
  /**
   * Logging service used for structured output and diagnostics.
   */
  readonly loggerService: AbstractLoggerService;
}
