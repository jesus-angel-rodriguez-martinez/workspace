import { type IApiLoggerServiceOptions } from '@domains/logger';
import { type AbstractLoggerService } from '@libs/logger';

/**
 * Abstract base class for routing the framework logs through the application logger.
 */
export abstract class AbstractApiLoggerService {
  /**
   * Logging service used for structured output and diagnostics.
   */
  protected readonly loggerService: AbstractLoggerService;

  /**
   * Restricts instantiation to subclasses.
   *
   * @param options - API logger service options.
   */
  protected constructor({ loggerService }: IApiLoggerServiceOptions) {
    this.loggerService = loggerService;
  }
}
