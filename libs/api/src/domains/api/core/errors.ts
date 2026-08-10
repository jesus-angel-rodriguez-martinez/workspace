import { type IApiErrorOptions, type IApiError } from '@domains/api';
import { type StatusCode, STATUS_CODE } from '@domains/status-code';

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
    super(error.detail, { cause: error.cause });

    this.code = error.code;
    this.detail = error.detail;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

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
      cause: options.cause,
      code: options.code || 'BAD_REQUEST_ERROR',
      detail:
        options.detail ||
        'The request could not be processed due to invalid input. Please check the provided data.',
      status: `${STATUS_CODE.BAD_REQUEST}`,
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
      cause: options.cause,
      code: options.code || 'UNAUTHORIZED_ERROR',
      detail: options.detail || 'Authentication is required.',
      status: `${STATUS_CODE.UNAUTHORIZED}`,
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
      cause: options.cause,
      code: options.code || 'FORBIDDEN_ERROR',
      detail: options.detail || 'You do not have permission to access the requested resource.',
      status: `${STATUS_CODE.FORBIDDEN}`,
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
      cause: options.cause,
      code: options.code || 'NOT_FOUND_ERROR',
      detail: options.detail || 'The requested resource could not be found.',
      status: `${STATUS_CODE.NOT_FOUND}`,
      title: options.title || 'Resource not found'
    });
  }
}

/**
 * Represents a 405 Method Not Allowed error.
 *
 * This error should be thrown when the request method is not supported for the requested resource.
 */
export class MethodNotAllowedError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      cause: options.cause,
      code: options.code || 'METHOD_NOT_ALLOWED_ERROR',
      detail: options.detail || 'The requested method is not allowed for this resource.',
      status: `${STATUS_CODE.METHOD_NOT_ALLOWED}`,
      title: options.title || 'Method not allowed'
    });
  }
}

/**
 * Represents a 406 Not Acceptable error.
 *
 * This error should be thrown when the resource cannot produce a response matching the accepted content types.
 */
export class NotAcceptableError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      cause: options.cause,
      code: options.code || 'NOT_ACCEPTABLE_ERROR',
      detail:
        options.detail ||
        'The requested resource cannot produce a response matching the accepted content types.',
      status: `${STATUS_CODE.NOT_ACCEPTABLE}`,
      title: options.title || 'Not acceptable'
    });
  }
}

/**
 * Represents a 408 Request Timeout error.
 *
 * This error should be thrown when the server times out waiting for the request.
 */
export class RequestTimeoutError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      cause: options.cause,
      code: options.code || 'REQUEST_TIMEOUT_ERROR',
      detail: options.detail || 'The server timed out waiting for the request.',
      status: `${STATUS_CODE.REQUEST_TIMEOUT}`,
      title: options.title || 'Request timeout'
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
      cause: options.cause,
      code: options.code || 'CONFLICT_ERROR',
      detail:
        options.detail ||
        'The request could not be completed due to a conflict with the current state of the resource.',
      status: `${STATUS_CODE.CONFLICT}`,
      title: options.title || 'Conflict detected while processing the request'
    });
  }
}

/**
 * Represents a 410 Gone error.
 *
 * This error should be thrown when the requested resource is no longer available and will not return.
 */
export class GoneError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      cause: options.cause,
      code: options.code || 'GONE_ERROR',
      detail: options.detail || 'The requested resource is no longer available.',
      status: `${STATUS_CODE.GONE}`,
      title: options.title || 'Gone'
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
      cause: options.cause,
      code: options.code || 'UNSUPPORTED_MEDIA_TYPE_ERROR',
      detail: options.detail || 'The request contains a media type that is not supported by the server.',
      status: `${STATUS_CODE.UNSUPPORTED_MEDIA_TYPE}`,
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
      cause: options.cause,
      code: options.code || 'UNPROCESSABLE_ENTITY_ERROR',
      detail:
        options.detail || 'The request was well-formed but was unable to be followed due to semantic errors.',
      status: `${STATUS_CODE.UNPROCESSABLE_ENTITY}`,
      title: options.title || 'Unprocessable entity'
    });
  }
}

/**
 * Represents a 429 Too Many Requests error.
 *
 * This error should be thrown when the client has sent too many requests in a given amount of time.
 */
export class TooManyRequestsError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      cause: options.cause,
      code: options.code || 'TOO_MANY_REQUESTS_ERROR',
      detail:
        options.detail ||
        'Too many requests have been sent in a given amount of time. Please try again later.',
      status: `${STATUS_CODE.TOO_MANY_REQUESTS}`,
      title: options.title || 'Too many requests'
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
      cause: options.cause,
      code: options.code || 'INTERNAL_SERVER_ERROR',
      detail: options.detail || 'An unexpected error occurred on the server. Please try again later.',
      status: `${STATUS_CODE.INTERNAL_SERVER_ERROR}`,
      title: options.title || 'Internal Server error'
    });
  }
}

/**
 * Represents a 501 Not Implemented error.
 *
 * This error should be thrown when the server does not support the functionality required to fulfill the request.
 */
export class NotImplementedError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      cause: options.cause,
      code: options.code || 'NOT_IMPLEMENTED_ERROR',
      detail:
        options.detail || 'The server does not support the functionality required to fulfill the request.',
      status: `${STATUS_CODE.NOT_IMPLEMENTED}`,
      title: options.title || 'Not implemented'
    });
  }
}

/**
 * Represents a 502 Bad Gateway error.
 *
 * This error should be thrown when the server receives an invalid response from an upstream server.
 */
export class BadGatewayError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      cause: options.cause,
      code: options.code || 'BAD_GATEWAY_ERROR',
      detail: options.detail || 'The server received an invalid response from an upstream server.',
      status: `${STATUS_CODE.BAD_GATEWAY}`,
      title: options.title || 'Bad gateway'
    });
  }
}

/**
 * Represents a 503 Service Unavailable error.
 *
 * This error should be thrown when the server is currently unable to handle the request.
 */
export class ServiceUnavailableError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      cause: options.cause,
      code: options.code || 'SERVICE_UNAVAILABLE_ERROR',
      detail:
        options.detail || 'The server is currently unable to handle the request. Please try again later.',
      status: `${STATUS_CODE.SERVICE_UNAVAILABLE}`,
      title: options.title || 'Service unavailable'
    });
  }
}

/**
 * Represents a 504 Gateway Timeout error.
 *
 * This error should be thrown when the server does not receive a timely response from an upstream server.
 */
export class GatewayTimeoutError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super({
      cause: options.cause,
      code: options.code || 'GATEWAY_TIMEOUT_ERROR',
      detail: options.detail || 'The server did not receive a timely response from an upstream server.',
      status: `${STATUS_CODE.GATEWAY_TIMEOUT}`,
      title: options.title || 'Gateway timeout'
    });
  }
}
