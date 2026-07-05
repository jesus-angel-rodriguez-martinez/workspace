import { ICoreError } from '@domains/cores';

/**
 * Base error class for all application-related exceptions.
 * Can be extended to create consistent, domain-specific error types throughout the application.
 */
export class CoreError extends Error implements ICoreError {
  public readonly code: string;
  public readonly detail: string;
  public readonly title: string;

  /**
   * @param error - The error payload.
   */
  constructor(error: ICoreError) {
    super(error.detail, { cause: error });

    this.code = error.code;
    this.detail = error.detail;
    this.name = this.constructor.name;
    this.title = error.title;

    if (error.stack) {
      this.stack = error.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
