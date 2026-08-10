import { type IApiError } from '@domains/api';

/**
 * Standardized envelope for a failed API response, aggregating one or more error objects.
 */
export interface IApiErrorsResponse {
  /**
   * The collection of errors describing why the request failed.
   */
  errors: IApiSafeErrorResponse[];
}

/**
 * Standardized envelope for a successful API response.
 */
export interface IApiResponse<T> {
  /**
   * The payload returned by the request.
   */
  data: T;
}

/**
 * Represents an API error response with only the information safe to expose to clients.
 */
export interface IApiSafeErrorResponse extends Partial<Omit<IApiError, keyof Pick<IApiError, 'cause'>>> {}
