import { type ApiError } from '@domains/api';
import { type StatusCode } from '@domains/status-code';
import { type CoreError } from '@libs/core';

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
 * Partial representation of an API error used to override properties of base errors.
 *
 * The `status` field is omitted to keep the HTTP code fixed.
 */
export interface IApiErrorOptions extends Partial<Omit<IApiError, keyof Pick<IApiError, 'status'>>> {}

/*
 * Defines the standardized structure of an API error response containing multiple error objects.
 * The `cause` field is omitted for security reasons.
 */
export interface IApiErrors {
  /*
   * Array of individual error details.
   */
  errors: Partial<Omit<IApiError, keyof Pick<IApiError, 'cause'>>>[];
}

export interface IApiResponse<T> {
  /**
   * The payload returned on a successful request.
   */
  data: T;
}

/**
 * Represents any error type that can be intercepted and processed by the API.
 */
export type UnknownError = ApiError | CoreError;
