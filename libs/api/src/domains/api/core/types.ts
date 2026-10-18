import { type ApiError } from '@domains/api';
import { type StatusCode } from '@domains/status-code';
import { type IKernelError, type KernelError } from '@libs/kernel';

/**
 * Maps each domain error code to its API exposure or `null` to keep it internal.
 */
export type ApiErrorMappings<DomainError extends IKernelError = IKernelError> = Readonly<
  Record<DomainError['code'], IApiErrorMapping | null>
>;

/**
 * Represents any error type that can be intercepted and processed by the API.
 */
export type UnknownError = ApiError | KernelError;

export interface IApiError {
  /**
   * The underlying error or value that caused this error, if any.
   */
  cause?: unknown;
  /**
   * A machine-readable identifier for the specific type of error.
   */
  code: string;
  /**
   * A human-readable explanation of the error, specific to this occurrence.
   */
  detail: string;
  /**
   * The HTTP status code applicable to this error.
   */
  status: StatusCode<string>;
  /**
   * A short, human-readable summary of the error type.
   */
  title: string;
}

/**
 * Describes how a domain error is exposed by the API.
 */
export interface IApiErrorMapping extends Partial<Pick<IApiError, 'detail' | 'title'>> {
  /**
   * The HTTP status code the domain error is answered with.
   */
  status: StatusCode<string>;
}

/**
 * Partial representation of an API error used to override properties of base errors.
 *
 * The `status` field is omitted to keep the HTTP code fixed.
 */
export interface IApiErrorOptions extends Partial<Omit<IApiError, keyof Pick<IApiError, 'status'>>> {}
