import { CoreError, type ICoreErrorOptions } from '@libs/core';

/**
 * Error thrown when the logger root is initialized more than once.
 */
export class LoggerAlreadyInitializedError extends CoreError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: ICoreErrorOptions = {}) {
    super({
      code: 'LOGGER.ALREADY_INITIALIZED',
      detail: 'The logger has already been initialized.',
      stack: options.stack,
      title: 'Logger already initialized'
    });
  }
}

/**
 * Error thrown when the logger root is accessed before initialization.
 */
export class LoggerNotInitializedError extends CoreError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: ICoreErrorOptions = {}) {
    super({
      code: 'LOGGER.NOT_INITIALIZED',
      detail: 'Cannot access the logger before it has been initialized.',
      stack: options.stack,
      title: 'Logger not initialized'
    });
  }
}
