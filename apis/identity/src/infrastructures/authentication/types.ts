import { type AbstractAuthenticationApp } from '@domains/authentication';
import { type AbstractUsersApp, type IUsersRepository } from '@domains/users';
import {
  type AbstractAuthenticationApiMapper,
  type AbstractAuthenticationResponseMapper
} from '@infrastructures/authentication';
import { type AbstractCryptographyService, type AbstractTokenService } from '@libs/security';

export type ComposeAuthentication = (
  configuration: IComposeAuthenticationConfiguration
) => IComposedAuthentication;

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

export interface IComposedAuthentication {
  /**
   * Responsible for mapping authentication API errors.
   */
  authenticationApiMapper: AbstractAuthenticationApiMapper;
  /**
   * Provides authentication use cases.
   */
  authenticationApp: AbstractAuthenticationApp;
  /**
   * Responsible for mapping authentication responses.
   */
  authenticationResponseMapper: AbstractAuthenticationResponseMapper;
}
