import { CoreError, type ICoreErrorOptions } from '@libs/core';

/**
 * Error thrown when the Authentication Middleware have already been initialized.
 */
export class AuthenticationMiddlewareAlreadyInitializedError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'AUTHENTICATION_MIDDLEWARE.ALREADY_INITIALIZED',
      detail: 'Authentication Middleware have already been initialized.',
      title: 'Authentication Middleware already initialized'
    });
  }
}
