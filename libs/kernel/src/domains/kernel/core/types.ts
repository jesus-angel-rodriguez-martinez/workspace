/**
 * Standardized interface for managing kernel application errors.
 */
export interface IKernelError extends IKernelErrorOptions {
  /**
   * A machine-readable identifier for the specific type of error.
   */
  readonly code: string;
  /**
   * A human-readable explanation of the error, specific to this occurrence.
   */
  readonly detail: string;
  /**
   * A short, human-readable summary of the error type.
   */
  readonly title: string;
}

export interface IKernelErrorOptions {
  /**
   * The underlying error or value that caused this error, if any.
   */
  cause?: unknown;
}
