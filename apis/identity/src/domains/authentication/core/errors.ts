import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when the refresh token is invalid, expired or belongs to a user that no longer exists.
 */
export class InvalidRefreshTokenError extends KernelError {
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'AUTHENTICATION.INVALID_REFRESH_TOKEN',
      detail: 'The provided refresh token is invalid or has expired.',
      title: 'Invalid refresh token'
    });
  }
}

/**
 * Error thrown when the username or password is incorrect.
 */
export class WrongCredentialsError extends KernelError {
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'AUTHENTICATION.WRONG_CREDENTIALS',
      detail: 'The provided username or password is incorrect.',
      title: 'Wrong credentials'
    });
  }
}
