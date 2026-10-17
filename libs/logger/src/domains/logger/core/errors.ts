import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when the logger root is initialized more than once.
 */
export class LoggerAlreadyInitializedError extends KernelError {
  public readonly code = 'LOGGER.ALREADY_INITIALIZED';
  public readonly title = 'Logger already initialized';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super('The logger has already been initialized.', options);
  }
}

/**
 * Error thrown when the logger root is accessed before initialization.
 */
export class LoggerNotInitializedError extends KernelError {
  public readonly code = 'LOGGER.NOT_INITIALIZED';
  public readonly title = 'Logger not initialized';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super('Cannot access the logger before it has been initialized.', options);
  }
}
