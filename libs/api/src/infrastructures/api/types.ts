import { type AbstractApiMapper } from '@domains/api';
import { type AbstractLoggerService } from '@libs/logger';

export interface IApiExceptionFilterOptions {
  /**
   * Responsible for mapping domain errors to their API errors.
   */
  readonly apiMapper: AbstractApiMapper;
  /**
   * Logging service used for structured output and diagnostics.
   */
  readonly loggerService: AbstractLoggerService;
}
