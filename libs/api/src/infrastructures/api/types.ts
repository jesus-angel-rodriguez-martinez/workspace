import { type AbstractApiMapper } from '@domains/api';
import { type AbstractLoggerService } from '@libs/logger';

export interface IApiExceptionFilterConfiguration {
  /**
   * Responsible for mapping domain errors to their API errors.
   */
  apiMapper: AbstractApiMapper;
  /**
   * Logging service used for structured output and diagnostics.
   */
  loggerService: AbstractLoggerService;
}
