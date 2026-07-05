/**
 * Standardized interface for managing core application errors.
 */
export interface ICoreError extends Pick<ICoreErrorOptions, 'stack'> {
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

export interface ICoreErrorOptions {
  /**
   * Optional stack trace associated with the error.
   */
  stack?: string | undefined;
}

/**
 * Standardized interface for managing the lifecycle of core application services.
 */
export interface ICoreService {
  /**
   * Gracefully shuts down the service, releasing any held resources.
   *
   * @returns A promise that resolves when cleanup is finished.
   */
  close(): Promise<void>;
  /**
   * Initializes the service with the provided configuration.
   *
   * @returns A promise that resolves when the initialization is complete.
   */
  init(): Promise<void>;
}
