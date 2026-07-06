import { type IApiErrorOptions, type IApiError } from '@domains/apis';
import { type StatusCode, STATUS_CODES } from '@domains/status-codes';

/**
 * Base class for standardized application errors.
 *
 * Provides shared properties and behavior for all specific HTTP error classes.
 */
export class ApiError extends Error implements IApiError {
  public readonly code: string;
  public readonly detail: string;
  public readonly status: StatusCode<string>;
  public readonly title: string;

  constructor(error: IApiError) {
    super(error.detail);

    this.code = error.code;
    this.detail = error.detail;
    this.name = this.constructor.name;

    if (error.stack) {
      this.stack = error.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    this.status = error.status;
    this.title = error.title;
  }
}

/**
 * Represents a 400 Bad Request error.
 *
 * This error should be thrown when the server cannot process the request due to
 * client-side issues such as validation errors or malformed input.
 */
export class BadRequestError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      code: options.code || 'BAD_REQUEST_ERROR',
      detail:
        options.detail ||
        'The request could not be processed due to invalid input. Please check the provided data.',
      stack: options.stack,
      status: `${STATUS_CODES.BAD_REQUEST}`,
      title: options.title || 'There was an error while validating the request'
    });
  }
}

/**
 * Represents a 401 Unauthorized error.
 *
 * This error should be thrown when authentication is required and has failed or has not yet been provided.
 */
export class UnauthorizedError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      code: options.code || 'UNAUTHORIZED_ERROR',
      detail: options.detail || 'Authentication is required.',
      stack: options.stack,
      status: `${STATUS_CODES.UNAUTHORIZED}`,
      title: options.title || 'Unauthorized access'
    });
  }
}

/**
 * Represents a 403 Forbidden error.
 *
 * This error should be thrown when the server understands the request but refuses to authorize it.
 */
export class ForbiddenError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      code: options.code || 'FORBIDDEN_ERROR',
      detail: options.detail || 'You do not have permission to access the requested resource.',
      stack: options.stack,
      status: `${STATUS_CODES.FORBIDDEN}`,
      title: options.title || 'Forbidden'
    });
  }
}

/**
 * Represents a 404 Not Found error.
 *
 * This error should be thrown when the requested resource could not be found.
 */
export class NotFoundError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      code: options.code || 'NOT_FOUND_ERROR',
      detail: options.detail || 'The requested resource could not be found.',
      stack: options.stack,
      status: `${STATUS_CODES.NOT_FOUND}`,
      title: options.title || 'Resource not found'
    });
  }
}

/**
 * Represents a 409 Conflict error.
 *
 * This error should be thrown when a request could not be completed due to a conflict with the current state of the resource.
 * Common use cases include duplicate entries, version conflicts, or violations of business rules.
 */
export class ConflictError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      code: options.code || 'CONFLICT_ERROR',
      detail:
        options.detail ||
        'The request could not be completed due to a conflict with the current state of the resource.',
      status: `${STATUS_CODES.CONFLICT}`,
      stack: options.stack,
      title: options.title || 'Conflict detected while processing the request'
    });
  }
}

/**
 * Represents a 415 Unsupported Media Type error.
 *
 * This error should be thrown when a request contains a media type that the server does not support.
 */
export class UnsupportedMediaTypeError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      code: options.code || 'UNSUPPORTED_MEDIA_TYPE',
      detail: options.detail || 'The request contains a media type that is not supported by the server.',
      status: `${STATUS_CODES.UNSUPPORTED_MEDIA_TYPE}`,
      stack: options.stack,
      title: options.title || 'Unsupported media type in the request'
    });
  }
}

/**
 * Represents a 422 Unprocessable Entity error.
 *
 * This error should be thrown when the server understands the content type and syntax
 * of the request entity, but the contained instructions are semantically invalid.
 */
export class UnprocessableEntityError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      code: options.code || 'UNPROCESSABLE_ENTITY_ERROR',
      detail:
        options.detail || 'The request was well-formed but was unable to be followed due to semantic errors.',
      stack: options.stack,
      status: `${STATUS_CODES.UNPROCESSABLE_ENTITY}`,
      title: options.title || 'Unprocessable entity'
    });
  }
}

/**
 * Represents a 500 Internal Server error.
 *
 * This error should be thrown when an unexpected failure occurs on the server
 * that is not directly caused by the client's request.
 */
export class InternalServerError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      code: options.code || 'INTERNAL_SERVER_ERROR',
      detail: options.detail || 'An unexpected error occurred on the server. Please try again later.',
      stack: options.stack,
      status: `${STATUS_CODES.INTERNAL_SERVER_ERROR}`,
      title: options.title || 'Internal Server error'
    });
  }
}
