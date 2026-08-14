import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

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
