import { type AbstractUsersApp, type IUsersRepository } from '@domains/users';
import { type AbstractCryptographyService, type AbstractTokenService } from '@libs/security';

export interface IAuthenticationAppConfiguration {
  /**
   * Provides cryptographic utilities.
   */
  cryptographyService: AbstractCryptographyService;
  /**
   * Provides token utilities.
   */
  tokenService: AbstractTokenService;
  /**
   * Provides user use cases.
   */
  usersApp: AbstractUsersApp;
  /**
   * Provides access to user data.
   */
  usersRepository: IUsersRepository;
}
