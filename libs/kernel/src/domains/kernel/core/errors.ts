import { type IKernelError } from '@domains/kernel';

/**
 * Base error class for all application-related exceptions.
 * Can be extended to create consistent, domain-specific error types throughout the application.
 */
export class KernelError extends Error implements IKernelError {
  public readonly code: string;
  public readonly detail: string;
  public readonly title: string;

  /**
   * @param error - The error payload.
   */
  constructor(error: IKernelError) {
    super(error.detail, { cause: error.cause });

    this.code = error.code;
    this.detail = error.detail;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.title = error.title;
  }
}
