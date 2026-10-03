/**
 * Standardized interface for aggregating one or more related errors into a single error.
 */
export interface IAggregateKernelErrorOptions extends Omit<IKernelError, 'detail'> {}

/**
 * Standardized interface for managing kernel application errors.
 */
export interface IKernelError extends IKernelErrorOptions {
  /**
   * A machine-readable identifier for the specific type of error.
   */
  code: string;
  /**
   * A human-readable explanation of the error, specific to this occurrence.
   */
  detail: string;
  /**
   * A short, human-readable summary of the error type.
   */
  title: string;
}

export interface IKernelErrorOptions {
  /**
   * The underlying error or value that caused this error, if any.
   */
  cause?: unknown;
}
