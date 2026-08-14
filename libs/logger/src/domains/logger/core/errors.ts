import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when the logger root is initialized more than once.
 */
export class LoggerAlreadyInitializedError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'LOGGER.ALREADY_INITIALIZED',
      detail: 'The logger has already been initialized.',
      title: 'Logger already initialized'
    });
  }
}

/**
 * Error thrown when the logger root is accessed before initialization.
 */
export class LoggerNotInitializedError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'LOGGER.NOT_INITIALIZED',
      detail: 'Cannot access the logger before it has been initialized.',
      title: 'Logger not initialized'
    });
  }
}
