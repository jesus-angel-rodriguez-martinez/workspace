import { type IKernelError, type IKernelErrorOptions } from '@domains/kernel';

/**
 * Base error class for all application-related exceptions.
 * Extend it and declare `code` and `title` as readonly fields so their literal types are preserved.
 */
export abstract class KernelError extends Error implements IKernelError {
  public abstract readonly code: string;
  public readonly detail: string;
  public abstract readonly title: string;

  /**
   * @param detail - A human-readable explanation of the error, specific to this occurrence.
   * @param options - Optional error configuration options.
   */
  protected constructor(detail: string, options: IKernelErrorOptions = {}) {
    super(detail, { cause: options.cause });

    this.detail = detail;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Base error class for aggregating one or more related errors into a single error.
 * Extend it and declare `code` and `title` as readonly fields so their literal types are preserved.
 */
export abstract class AggregateKernelError extends KernelError {
  /**
   * @param errors - The collection of errors to aggregate.
   * @param options - Optional error configuration options.
   */
  protected constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    const count = errors.length;
    const details = errors.map(({ code, detail }) => `- [${code}] ${detail}`).join('\n');
    const isSingular = count === 1;
    super(`Found ${count} ${isSingular ? 'error' : 'errors'}:\n${details}`, options);
  }
}
