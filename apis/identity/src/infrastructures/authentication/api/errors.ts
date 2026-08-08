import { type WrongCredentialsError } from '@domains/authentication';
import { UnauthorizedError } from '@libs/api';

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
