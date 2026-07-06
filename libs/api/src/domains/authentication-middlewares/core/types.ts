import { type IUsersRepository } from '@libs/security';
import { type AbstractLoggerService } from '@libs/logger';

export interface IAuthenticationMiddlewaresServiceConfiguration {
  /**
   * Logging service used for structured output and diagnostics.
   */
  loggerService: AbstractLoggerService;
  /**
   * The secret key used to sign tokens.
   */
  secret: string;
  /**
   * Provides access to user data.
   */
  usersRepository: IUsersRepository;
}
