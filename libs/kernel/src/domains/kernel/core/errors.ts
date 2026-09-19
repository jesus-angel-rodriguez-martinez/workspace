import { type IAggregateKernelErrorOptions, type IKernelError } from '@domains/kernel';

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

/**
 * Base error class for aggregating one or more related errors into a single error.
 * Can be extended to create consistent, domain-specific aggregate error types.
 */
export class AggregateKernelError extends KernelError {
  /**
   * @param errors - The collection of errors to aggregate.
   * @param options - The aggregate error configuration options.
   */
  constructor(errors: IKernelError[], options: IAggregateKernelErrorOptions) {
    const count = errors.length;
    const details = errors.map(({ code, detail }) => `- [${code}] ${detail}`).join('\n');
    const isSingular = count === 1;
    super({
      cause: options.cause,
      code: options.code,
      detail: `Found ${count} ${isSingular ? 'error' : 'errors'}:\n${details}`,
      title: options.title
    });
  }
}
