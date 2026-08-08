import { CoreError, type ICoreErrorOptions } from '@libs/core';

/**
 * Error thrown when the username or password is incorrect.
 */
export class WrongCredentialsError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'AUTHENTICATION.WRONG_CREDENTIALS',
      detail: 'The provided username or password is incorrect.',
      title: 'Wrong credentials'
    });
  }
}
