import { CoreError, ICoreErrorOptions } from '@libs/core';

/**
 * Error thrown when the username or password is incorrect.
 */
export class WrongCredentialsError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'AUTHENTICATION.WRONG_CREDENTIALS',
      title: 'Wrong username or password.',
      detail: 'The provided username or password is incorrect'
    });
  }
}
