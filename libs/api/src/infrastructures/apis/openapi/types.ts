import { type StatusCode } from '@domains/status-codes';

/**
 * Represents a single validation error detail produced by the OpenAPI validator.
 */
export interface IOpenApiError {
  /*
   * JSON path to the property that failed validation.
   */
  path: string;
  /*
   * A machine-readable identifier for the specific type of error.
   */
  errorCode: string;
  /*
   * A human-readable explanation of the error, specific to this occurrence.
   */
  message: string;
  /*
   * Location in the request where the error occurred.
   */
  location: string;
}

/**
 * Represents a collection of validation errors returned by the OpenAPI validator.
 */
export interface IOpenApiErrors {
  /*
   * HTTP status code of the error response.
   */
  status: StatusCode<number>;
  /*
   * Array of individual error details.
   */
  errors: IOpenApiError[];
}
