import { type AbstractAuthenticationApp } from '@domains/authentication';
import { type AbstractUsersApp, type IUsersRepository } from '@domains/users';
import { type AbstractTokenService, type AbstractCryptographyService } from '@libs/security';

export type ComposeAuthentication = (
  configuration: IComposeAuthenticationConfiguration
) => AbstractAuthenticationApp;

export interface IComposeAuthenticationConfiguration {
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
