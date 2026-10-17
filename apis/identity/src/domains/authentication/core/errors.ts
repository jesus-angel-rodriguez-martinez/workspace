import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when the refresh token is invalid, expired or belongs to a user that no longer exists.
 */
export class InvalidRefreshTokenError extends KernelError {
  public readonly code = 'AUTHENTICATION.INVALID_REFRESH_TOKEN';
  public readonly title = 'Invalid refresh token';

  constructor(options: IKernelErrorOptions = {}) {
    super('The provided refresh token is invalid or has expired.', options);
  }
}

/**
 * Error thrown when the username or password is incorrect.
 */
export class WrongCredentialsError extends KernelError {
  public readonly code = 'AUTHENTICATION.WRONG_CREDENTIALS';
  public readonly title = 'Wrong credentials';

  constructor(options: IKernelErrorOptions = {}) {
    super('The provided username or password is incorrect.', options);
  }
}
