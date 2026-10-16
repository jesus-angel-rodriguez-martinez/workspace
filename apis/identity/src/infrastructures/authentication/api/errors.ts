import { type InvalidRefreshTokenError, type WrongCredentialsError } from '@domains/authentication';
import { UnauthorizedError } from '@libs/api';

/**
 * Error thrown when the refresh token is invalid, expired or belongs to a user that no longer exists.
 */
export class InvalidRefreshTokenApiError extends UnauthorizedError {
  constructor(invalidRefreshTokenError: InvalidRefreshTokenError) {
    super({
      cause: invalidRefreshTokenError,
      code: invalidRefreshTokenError.code,
      detail: invalidRefreshTokenError.detail,
      title: invalidRefreshTokenError.title
    });
  }
}

/**
 * Error thrown when the username or password is incorrect.
 */
export class WrongCredentialsApiError extends UnauthorizedError {
  constructor(wrongCredentialsError: WrongCredentialsError) {
    super({
      cause: wrongCredentialsError,
      code: wrongCredentialsError.code,
      detail: wrongCredentialsError.detail,
      title: wrongCredentialsError.title
    });
  }
}
