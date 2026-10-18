import { type KernelError } from '@domains/kernel';

/**
 * Infers the union of the errors exported by an errors module that only exports kernel errors.
 */
export type InferKernelError<Errors extends Record<string, KernelErrorConstructor>> = InstanceType<
  Errors[keyof Errors]
>;

/**
 * Any constructor of a kernel error.
 */
export type KernelErrorConstructor = new (...args: never[]) => KernelError;

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
